import React, { useContext } from 'react';
import { AdminTiles } from '../config/Config';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalContext';

function AdminFinder() {

  const navigate = useNavigate();
  const {getACLByScreen} = useContext(GlobalContext)!;

  const aclData = getACLByScreen('adminfinder');
  const handleOnClick = (libraryName: string) => {
    navigate(`/admin/${libraryName}`);
  };

  return (
    <div style={{margin: '10px 40px'}}>
      {AdminTiles
      ?.map((data) => {
        return (
          <div key={data.title} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <h2>{data.title}</h2>
            <div className='adminFinderCnt'>
              {data?.children
              ?.filter(item => aclData?.config?.[item.libraryName].visible)
              .map((tile) => {
                return (
                  <div key={tile.name} className='adminCard'>
                    <span style={{fontWeight: 'bold', fontSize: '21px'}}>{tile.name}</span>
                    <p style={{fontSize: '18px'}}>{tile.description}</p>
                    <hr />
                    <button className='btnOpen' onClick={() => handleOnClick(tile.libraryName)}>Open</button>
                  </div>
                );
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AdminFinder