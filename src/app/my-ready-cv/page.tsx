"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ResumeWeb from "@/components/CvReady/ResumeWeb";
import ProtectedRoute from "@/hocs/AuthenticatedRoute";
import { useRouter } from "next/navigation"

export interface JSONObject {
  [key: string]: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  tasks: string[];
}

export interface Contact {
  linkedin?: string;
  github?: string;
  email?: string;
  phone?: string;
}

interface Education {
  degree?: string;
  institution?: string; // make institution required
  duration?: string;
  school?: string;
}

export interface Data {
  name?: string;
  fullName?: string;
  profession?: string;
  about: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  additionalProperties: JSONObject;
  contacts: Contact;
}

const CodeBlocksPage: React.FC = () => {
  const [data, setData] = useState<any | Data | null>(null);
  const { codeBlocks } = useSelector((state: RootState) => state.messages);
  const router = useRouter();

  useEffect(() => {
    if (codeBlocks && codeBlocks[0]) {
      try {
        const dataObject = JSON.parse(codeBlocks[0]);
        setData(dataObject);
      } catch (error) {
        console.error("Failed to parse data:", error);
      }
    }
    else {
      router.push("/history");
    }
  }, [codeBlocks, router]);

  return (
    <ProtectedRoute>
      {data ? (
        <>
          <ResumeWeb data={data} />
        </>
      ) : null}
    </ProtectedRoute>
  );
};

export default CodeBlocksPage;
