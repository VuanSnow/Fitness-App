import axios from "axios";

export const addCustomers = customers => ({
  type: "ADD_CUSTOMERS",
  customers
});

export const removeCustomer = id => ({
  type: "REMOVE_CUSTOMER",
  id
});

export function removeCustomerFunc(id) {
  return dispatch => {
    dispatch(removeCustomer(id));
  };
}

export function fetchCustomers() {
  return dispatch => {
    let arr = null;
    axios
      .get(`https://customerrest.herokuapp.com/api/customers`)
      .then(result => {
        arr = [...result.data.content];
        arr.forEach(e => {
          //Get customer id from link
          const lastSlashIndex = e.links[0].href.lastIndexOf("/");
          e.id = Number(e.links[0].href.substring(lastSlashIndex + 1));
          axios
            .get(`${e.links[2].href}`)
            .then(trainingData => {
              e.trainings = trainingData.data.content;
            })
            .catch(e => console.error(e));
        });
      })
      .catch(e => console.error(e))
      .finally(() => dispatch(addCustomers(arr)));
  };
}
