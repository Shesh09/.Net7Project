using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenServices : ITokenService
    {
        //pt asta e importata System.IdentityModel ca sa se face JWT-uri
        private readonly SymmetricSecurityKey _key;
        //key to sigh the token and then inject it into the service
        public TokenServices(IConfiguration config)
        {
            //SSK sta pe server, clientul nu trb sa o decripteze, trb sa il facem in bytes si in paranteze
            //patrate accesezi cheia

            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            //daca nu merge e importata libraria gresita pe claim
            //claim incearca sa lege o identitate de o identitate
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,  user.UserName),
                
            };


            //aici este incriptata cheia
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);

            //tokenul ce se intoarce
            //Work in progress, trb alta functie

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims), //claim-urule pe care le intorci
                Expires = DateTime.Now.AddDays(7), //zile cat timp logarea pe cont tine
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);


        }


    }
}