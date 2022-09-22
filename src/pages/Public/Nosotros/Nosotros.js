import React, { useEffect, useState } from "react";
import membersAPI from '../../../shared/APICalls';
import DataList from '../../../Components/DataList/DataList';
import Button from '../../../Components/Buttons/Buttons';
import Loader from "../../../Components/Loader/Loader";

const Nosotros = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await membersAPI.get('/members')
        setMembers(res.data.data)
      } catch (error) {
        setMembers([
          {
            name: 'Julian Fernandez',
            rol: 'CEO / Founder',
            image: 'https://simpliusados.com/wp-content/uploads/2020/07/Rect%C3%A1ngulo-610-300x300.png'
          }
        ]);
      } finally {
        setTimeout(function () {
          setLoading(false)
        }, 500);
      }
    }
    getMembers();
  }, []);

  return (
    <div className="w-10/12 flex flex-col m-auto">
      {JSON.stringify(members) !== '[]' ? (
        <>
          <div className="w-10/12 my-7 mx-auto pb-16"></div>
          <h1 className="text-3xl font-semibold text-center">¡Nuestro Staff!</h1>
          <div className="flex flex-col-reverse md:flex-row my-14 gap-6">
            <div className="flex flex-col justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-center md:text-start">{members[0].name}</h1>
                <h3 className="text-2xl mt-4">{members[0].rol}</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolore
                tempora omnis amet. Beatae, placeat similique iusto eos nihil
                temporibus, qui vel aliquam voluptates animi blanditiis natus ab
                quidem perferendis! Neque ab iusto eveniet hic suscipit eius
                aspernatur cumque. Nostrum tempore itaque qui impedit assumenda at
                praesentium quo consequuntur dolorum dolores earum sapiente
                exercitationem dolore, nemo debitis quae optio porro!
              </p>
              <Button route='/contacts' buttonName='¡Quiero ser parte!' styles='formButton' />
            </div>
            <img
              className="rounded-2xl w-44 h-44 sm:w-56 sm:h-60 md:w-72 md:h-72 mx-auto"
              src={members[0].image}
              alt={members[0].name}
            />
          </div>
          <DataList data={members} loading={loading} type='member' title='miembros' />
          <div className="w-10/12 my-7 mx-auto pb-16"></div>
        </>
      ) : (
        <Loader />
      )
      }
    </div>
  )
};
export default Nosotros;
