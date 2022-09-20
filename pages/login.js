import React from 'react';
import { getProviders, signIn } from "next-auth/react"
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";

function login({ providers }) {
   // Utilize Dynamic JSX type during Runtime to render SpecificLoginButton

   return (
      <div>
         <div className='products-box'>
            <div className='products-heading'>
               <h2>Login via OAuth</h2>
            </div>
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
      </div >
   );
}

export async function getServerSideProps() {
   const providers = await getProviders()
   return {
      props: { providers },
   }
}

export default login;