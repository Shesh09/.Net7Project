using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DOTs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    
    public class AccountController : BaseApiController
    {
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;


        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")] // POST: api/account/register
                                        //api/account/register?username=sam&password=password
                                        //RegisterDto face comparatia intre username-uri, poate gasesti ceva si cu parole
        //UserDto compara ce avem in memorie cu ce verificam prin dto
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if(await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            //initialize a new instance al algoritmului dat de hash-uit
            //sa te uiti dupa libraria de criptografare in cazul in care apare o eroare
            using var hmac= new HMACSHA256();

            //Aici se creaza un nou user
            var user= new AppUser
            {
                UserName=registerDto.Username.ToLower(),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt= hmac.Key
            };
            //linia de jos salveaza in memorie user-ul
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

         [HttpPost("login")]
         public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)  
         {
     //find merge daca stim cheia primara a modelului, daca nu mergem cu first or default / single or default
     var user = await _context.Users.SingleOrDefaultAsync(x=>
     x.UserName==loginDto.Username);

     if (user == null) return Unauthorized("Invalid username");

     //momentan doar iau userName-ul, hash-ul e buguit

            using var hmac = new HMACSHA256(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");
                
            }
          
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username){
            //x reprezinta users si cauta daca e vreun user
            //daca apare vreo eroare e de la AnyAsync, importat o noua librarie ca sa mearga
            return await _context.Users.AnyAsync(x=>x.UserName==username.ToLower());
        }
    }
}