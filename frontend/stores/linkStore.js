import { defineStore } from 'pinia'
import { addRegistrationLink, checkUrl } from '@firebasegen/default-connector';



// Call the `listAllTutors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.


export const useLinkStore = defineStore('linkStore', {
    state: () => {
        return {
            link: '',
            returnedlink: '',
        }
    },
    actions: {
        async createLink(date) {
            try {
                console.log(date)
                const expiryDate  = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
                console.log(expiryDate)
                const { data } = await addRegistrationLink({expiryDate});
                console.log(data);
                this.link = data.registrationLink_insert.id;
            } catch (error) {
                console.log(error)
            }
        },  

        async trycheckURL(id) {
          try {
            console.log(id)
            const { data } = await checkUrl({id});
            console.log(data);
            this.returnedlink = data;
          } catch (error) {
            console.log(error)
          }
         }
    }
})