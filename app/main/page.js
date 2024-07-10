import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';
import { runQuery } from "../actions/db";
import AppCard from "../components/AppCard";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import Fullname from "../components/Fullname";
import { Toaster, toast } from "sonner";

export default async function MainPage({ userCookie }) {

  let user;
  let apps = [];
  let platforms = [];

  const cookieStore = cookies();
  const jwtCookie = cookieStore.get('jwt_token');


  let decodedJWT;
  let fullNameMissing = false;


  try {
    decodedJWT = jwt.verify(jwtCookie.value, process.env.JWT_SECRET);
    user = await runQuery(`SELECT * FROM users WHERE email = '${decodedJWT.email}'`);
    apps = await runQuery(`SELECT * FROM VW_TOOLS`);
    platforms = await runQuery(`Select * from platforms`);

    // console.log(decodedJWT)
    // console.log(platforms)
    // console.log(apps)
    if (user[0].first_name === null || user[0].last_name === null) {
      fullNameMissing = true;
    }

  } catch (error) {
    redirect('/login')
  }


  if(fullNameMissing) {
    return (
      <Fullname email={decodedJWT.email}/>
    )
  }

  return (
    <div className="flex flex-wrap justify-center flex-col">
      <Toaster />
      <Navbar userEmail={decodedJWT.email} firstName={user[0].first_name} lastName={user[0].last_name}/>

      <div className="flex flex-row">
        <div className="flex">
          <Filter platforms={platforms} />
        </div>

        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center w-full">
              <div className="bg-white p-6  min-w-full">
                <div className="mt-1 relative rounded-md flex flex-row justify-center mb-4">
                  <input
                    type="text"
                    id="input"
                    className="focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-smrounded-md min-h-10 border-black rounded shadow-lg max-w-4xl"
                    placeholder="Search by name"
                  />
                </div>
              </div>
          </div>

          <div className="grid grid-cols-2">
            {apps.map((app, index) => {
              return (

                <div>
                  <AppCard key={index} {...app} />
                </div>

              )
            })}
          </div>

        </div>


      </div>
    </div>
  );
}