import { defineStore } from 'pinia'
import { addRegistrationLink } from '@firebasegen/default-connector';


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
              const { data } = await addRegistrationLink(date);
              console.log(data);
              this.link = data;
            } catch (error) {
                console.log(error)
            }
        },

        // async trycheckURL() {
        //   try {
        //     const { data } = await checkURL(id);
        //     console.log(data);
        //     this.returnedlink = data;
        //   } catch (error) {
        //     console.log(error)
        //   }
        // }
    }
})