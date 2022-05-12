import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

function RoleItem({ setShowDelete, setShowUpdatePer, role }) {
  return (
    <>
      {role &&
        role.perList.map((item, i) => {
          return (
            <Form.Group
              key={i}
              className='d-flex align-items-center justify-content-between py-2'
            >
              <Form.Check type='checkbox' label={item.per} />
              <ButtonGroup>
                <Button className='me-2' onClick={() => setShowDelete(true)}>
                  <i className='fa-solid fa-trash'></i>
                </Button>
                <Button onClick={() => setShowUpdatePer(true)}>
                  <i className='fa-solid fa-up-right-from-square'></i>
                </Button>
              </ButtonGroup>
            </Form.Group>
          );
        })}
    </>
  );
}

export default RoleItem;
