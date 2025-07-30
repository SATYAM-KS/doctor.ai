"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetail";

export type UseDetail = {
  name: string;
  email: string;
  credit: number;
};

function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<UseDetail | undefined>(
    undefined
  );

  const { user } = useUser();

  const createNewUser = useCallback(async () => {
    try {
      const response = await axios.post("/api/users");
      console.log(response.data);
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user, createNewUser]);

  return (
    <div>
      <UserDetailContext.Provider value={userDetail}>
        {children}
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
