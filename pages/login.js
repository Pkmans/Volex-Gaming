import React from 'react';
import { getProviders, signIn } from "next-auth/react"
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";

function login({ providers }) {

   return (
      <div>
         <div className='products-box'>
            <h1 className='products-heading'>Login via OAuth</h1>

            <div className='login-container'>

               {Object.values(providers).map((provider) => {

                  const components = {
                     Google: GoogleLoginButton,
                     Facebook: FacebookLoginButton,
                     GitHub: GithubLoginButton
                  }

                  const SpecificLoginButton = components[provider.name]

                  return (
                     <div key={provider.name} >

                        <SpecificLoginButton className='oauth-logins' onClick={() => signIn(provider.id)}>
                           Sign in with {provider.name}
                        </SpecificLoginButton>

                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   );
}

export async function getServerSideProps(context) {
   const providers = await getProviders()
   return {
      props: { providers },
   }
}

export default login;