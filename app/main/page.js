import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';
import { runQuery } from "../actions/db";
import AppCard from "../components/AppCard";
import Navbar from "../components/Navbar";
import Fullname from "../components/Fullname";
import ColumnNumber from "../components/NumberOfCols";


export default async function MainPage({ searchParams }) {

  let user;
  let apps = [];
  let platforms = [];
  let isAdmin;

  const cookieStore = cookies();
  const jwtCookie = cookieStore.get('jwt_token');

  let layout = searchParams.layout || '2';

  if (!['1', '2', '3'].includes(layout)) {
    layout = '2';
  }


  let decodedJWT;
  let fullNameMissing = false;

  try {
    decodedJWT = jwt.verify(jwtCookie.value, process.env.JWT_SECRET);
    user      = await runQuery(`SELECT * FROM users WHERE email = '${decodedJWT.email}'`);
    apps      = await runQuery(`SELECT * FROM VW_TOOLS`);
    platforms = await runQuery(`Select * from platforms`);
    isAdmin = user[0].role === 'ADMIN';

    console.log('Getting user...')
    console.log('User is...', user)

    if (user[0].first_name === null || user[0].last_name === null) {
      fullNameMissing = true;
    }

  } catch (error) {
    console.log('Uslo u catch!!!', error.message)
    redirect('/login')
  }


  if (fullNameMissing) {
    return (
      <Fullname email={decodedJWT.email} />
    )
  }

  // const classToUse = layout !== '1' ? 'flex flex-row' : ' ';
  const classToUse = 'flex flex-row';
  const gridToUse = `grid grid-cols-2`

  return (
    <div className="flex flex-wrap justify-center flex-col bg-gray-100">
      <Navbar userEmail={decodedJWT.email} firstName={user[0].first_name} lastName={user[0].last_name} isAdmin={isAdmin} />

      <ColumnNumber layout={layout}/>

      <div className={classToUse}>
        {/* <div className="flex">
          <Filter platforms={platforms} />
        </div> */}

        <div className={classToUse}>

          <div className={gridToUse}>
            {apps.map((app, index) => {
              return (
                <div key={index}>
                  <AppCard key={index} app={app} isAdmin={isAdmin} platforms={platforms} />
                </div>

              )
            })}
          </div>

        </div>


      </div>
    </div>
  );
}