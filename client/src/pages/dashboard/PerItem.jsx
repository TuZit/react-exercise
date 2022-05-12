import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

function PerItem({
  setShowUpdatePer,
  setShowDelete,
  per,
  setPerID,
  checkPermission,
  selectedRole,
  setSelectedRole,
}) {
  const handleCheckBox = (e, id) => {
    if (e.target.checked) {
      setSelectedRole({
        ...selectedRole,
        perIDList: [...selectedRole?.perIDList, id],
      });
      // perIDList = Array.from(new Set(perIDList));
    } else {
      // perIDList = Array.from(new Set(perIDList));
      setSelectedRole({
        ...selectedRole,
        perIDList: selectedRole.perIDList.filter((item) => item !== id),
      });
    }
  };

  return (
    <>
      <Form.Group
        disabled
        className='d-flex align-items-center justify-content-between p-2 border mb-1'
      >
        <Form.Check
          type='checkbox'
          checked={checkPermission(per.id)}
          label={per.name}
          value={per.id}
          onChange={(e) => {
            handleCheckBox(e, per.id);
          }}
        />
        <ButtonGroup>
          <Button
            className='me-2'
            onClick={() => {
              setShowDelete(true);
              setPerID(per.id);
            }}
          >
            <i className='fa-solid fa-trash'></i>
          </Button>
          <Button
            onClick={() => {
              setShowUpdatePer(true);
              setPerID(per.id);
            }}
          >
            <i className='fa-solid fa-up-right-from-square'></i>
          </Button>
        </ButtonGroup>
      </Form.Group>
    </>
  );
}

export default PerItem;
