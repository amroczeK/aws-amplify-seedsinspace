import { API } from "aws-amplify";

export const getAllSeeds = async () => {
  try {
    const data = await API.get("SeedsAPI", "/seeds", {});
    console.log("seeds:", data);
    //return data;
  } catch (error) {
    console.log(error);
    //throw error;
  }
};

export const getSeedById = async req => {
  let { entry_id } = req;
  try {
    const data = await API.get("SeedsAPI", `/seeds/${entry_id}`, {});
    console.log("seed:", data);
    //return data;
  } catch (error) {
    console.log(error);
    //throw error;
  }
};

export const addSeedEntry = async req => {
  try {
    const data = await API.post("SeedsAPI", "/seeds", {
      body: {
        ...req,
      },
    });
    console.log("added seed:", data);
    //return data;
  } catch (error) {
    console.log(error);
    //throw error;
  }
};

export const updateSeedEntry = async req => {
  try {
    const data = await API.put("SeedsAPI", "/seeds", {
      body: {
        ...req,
      },
    });
    console.log("updated seed:", data);
    //return data;
  } catch (error) {
    console.log(error);
    //throw error;
  }
};

export const deleteSeedEntry = async req => {
  let { entry_id } = req;
  try {
    const data = await API.get("SeedsAPI", `/seeds/${entry_id}`, {});
    console.log("deleted seed:", data);
    //return data;
  } catch (error) {
    console.log(error);
    //throw error;
  }
};
