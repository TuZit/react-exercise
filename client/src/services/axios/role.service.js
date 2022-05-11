import axios from 'axios';
const ROLE_API = 'https://62642ce498095dcbf92c71ce.mockapi.io/api/';

// Get all Role from API
const getRole = async (setRoleData) => {
  try {
    const res = await axios.get(ROLE_API + 'roles');
    setRoleData(res.data);
  } catch (err) {
    console.log(err);
  }

  // return axios.get(ROLE_API + 'roles').then(res => res.data)
};

// Get all Permission from API
const getPers = async (setPerDatas) => {
  try {
    const res = await axios.get(ROLE_API + 'permission');
    setPerDatas(res.data);
  } catch (err) {
    console.log(err);
  }

  // return axios.get(ROLE_API + 'permission').then((res) => res.data)
};

// Add New Role func
const createRole = async (
  role,
  toast,
  setRoleData,
  setSelectedRole,
  refetch
) => {
  try {
    const res = await axios.post(ROLE_API + 'roles', {
      name: role,
    });
    setSelectedRole(res.data);
    getRole(setRoleData);
    refetch();
    toast.success('Successfully Added Role!');
  } catch (err) {
    console.log(err);
    toast.error('Failed Add Role!');
  }
  // return axios
  //   .post(ROLE_API + 'roles', {
  //     name: role,
  //   })
  //   .then(() => {
  //     getRole(setRoleData);
  //     toast.success('Successfully Added Role!');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     toast.error('Failed Add Role!');
  //   });
};

// Add new permission to current role
const createPer = async (name, toast, setPerDatas, setRoleID) => {
  try {
    const res = await axios.post(ROLE_API + 'permission', {
      name: name,
    });
    setRoleID(res.data.id);
    getPers(setPerDatas);
    toast.success('Successfully Added Permission!');
  } catch (err) {
    console.log(err);
    toast.error('Failed Add Permission!');
  }
  // return axios
  //   .post(ROLE_API + 'permission', {
  //     name: name,
  //   })
  //   .then((res) => {
  //     getPers(setPerDatas);
  //     toast.success('Successfully Added Permission!');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     toast.error('Failed Add Permission!');
  //   });
};

// Delete Role func
const deleteRoler = (id, toast, setRoleData) => {
  return axios
    .delete(`${ROLE_API}roles/${id}`)
    .then(() => {
      getRole(setRoleData);
      toast.success('Deleted Role!');
    })
    .catch((err) => {
      toast.error('Failed to Delete!');
      console.log(err);
    });
};

// Delete a Permission
const deletePermission = (id, toast, setPerDatas) => {
  return axios
    .delete(`${ROLE_API}permission/${id}`)
    .then(() => {
      getPers(setPerDatas);
      toast.success('Deleted Permission!');
    })
    .catch((err) => {
      toast.error('Failed to Permission!');
      console.log(err);
    });
};

// Modify Permission Name
const modifyPerName = async (id, name, toast, setPerDatas) => {
  try {
    await axios.put(`${ROLE_API}permission/${id}`, {
      name: name,
    });
    getPers(setPerDatas);
    toast.success('Modified Permission');
  } catch (err) {
    console.log(err);
    toast.err('Modify Permission Failed');
  }
};

// Save Permission
const savePerList = async (id, newPerList, toast, setRoleData) => {
  try {
    await axios.put(`${ROLE_API}roles/${id}`, {
      perIDList: newPerList,
    });

    getRole(setRoleData);
    toast.success('Successfully Save Permission!');
  } catch (err) {
    toast.error('Failed to save!');
    console.log(err);
  }
};

const roleService = {
  getRole,
  getPers,
  createRole,
  createPer,
  deleteRoler,
  deletePermission,
  modifyPerName,
  savePerList,
};

export default roleService;
