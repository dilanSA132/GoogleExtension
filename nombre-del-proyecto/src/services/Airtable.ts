import Airtable, { Table } from 'airtable';

const AIRTABLE_API_KEY = 'pat3Jr0NwtKP8sD2x.e2bd5f098f445446f0b4daa4cfe475ef879bea09781fa3970619693b215b6330';
const BASE_ID = "app1L8kssoezKcFSA";

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID);
const table: Table<any> = base("tblJ2BdSAUvQe1bG2");

const findAllRecords = async () => {
  return new Promise<any[]>((resolve, reject) => {
    const records: any[] = [];
    table.select({}).eachPage(
      (partialRecords, fetchNextPage) => {
        records.push(...partialRecords);
        fetchNextPage();
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(records);
        }
      },
    );
  });
};

const saveDataToAirtable = async (data: any) => {
  try {
    const createdRecord = await table.create(data);
    console.log('Registro creado en Airtable:', createdRecord);
    return createdRecord;
  } catch (error) {
    console.error('Error al guardar datos en Airtable:', error);
    throw error;
  }
};


export { findAllRecords, saveDataToAirtable};
