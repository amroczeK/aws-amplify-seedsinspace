import { useEffect, useState } from "react";
import { useAws } from "../../context/AWSContext";
import * as API from "../../apis";

const useSchoolData = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { cognitoUser } = useAws();

  useEffect(() => {
    if ((cognitoUser?.attributes?.sub && !schoolData) || refetch) {
      API.getSchool(cognitoUser.attributes.sub)
        .then(data => {
          setSchoolData(data);
          setRefetch(false);
        })
        .catch(console.error);
    }
  }, [cognitoUser, schoolData, refetch]);

  return { schoolData, setRefetch };
};

export default useSchoolData;
