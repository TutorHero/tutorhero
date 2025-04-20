process.env.DATA_CONNECT_EMULATOR_HOST = "http://127.0.0.1:9399" // remove when deploy
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getDataConnect } = require('firebase-admin/data-connect');


const app = initializeApp();

const dataConnect = getDataConnect({
    serviceId: 'tutorhero-db',
    location: 'localhost', // "asia-southeast1"
});

exports.scheduledCronJob = onSchedule("0 0 1 * *", async (event) => {
    const mutation =
        `mutation cleanRegistrationLinks @auth(level: NO_ACCESS){
    registrationLink_deleteMany(
    where: { expiryDate: { lt_expr: "request.time" } }
    )
    }`
    try {
        const { data } = await dataConnect.executeGraphql(mutation)
        logger.info(data);
    } catch (error) {
        logger.error(error);
    }
})

