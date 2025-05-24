process.env.DATA_CONNECT_EMULATOR_HOST = "http://127.0.0.1:9399" // remove when deploy
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getDataConnect } = require('firebase-admin/data-connect');
const { google } = require('googleapis')


const app = initializeApp();

const dataConnect = getDataConnect({
    serviceId: 'tutorhero-db',
    location: 'localhost', // "asia-southeast1"
});

exports.scheduledCronJob = onSchedule("0 0 1 * *", async (event) => {
    const date = new Date()
    const expiry = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
    logger.info(expiry)
    const mutation =
        `mutation cleanStudentFormURLs($expiryDate:Timestamp!) @auth(level: NO_ACCESS) {
            studentFormURL_deleteMany(
              where: { expiryDate: { lt: $expiryDate } }
            )
        }`

    try {
        const { data } = await dataConnect.executeGraphql(mutation, { variables: { expiryDate: expiry } })
        logger.info(data);
    } catch (error) {
        logger.error(error);
    }
})
