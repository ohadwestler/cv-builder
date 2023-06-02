"use client";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import ResumeWeb from "@/components/CvReady/ResumeWeb";
import { Data } from "../my-ready-cv/page";
import { useDispatch, useSelector } from "react-redux";
import { fetchCVs } from "@/redux/cvsHistorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import ProtectedRoute from "@/hocs/AuthenticatedRoute";
import { Typography, Box } from "@mui/material";
import Image from "next/image";
import Loading from "@/components/Loading";


const StyledList = styled(List)(({ theme }) => ({
  // width: '100%',
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  // backgroundColor: 'white',
  height: "80%",

  overflowY: "auto",
}));

interface CV {
  cv_data: Data;
  created_at: Date | string;
}

const HistoryPage: NextPage = () => {
  const [selectedCv, setSelectedCv] = useState<CV | null>(null);
  const [history, setHistory] = useState<CV[]>([]);
  const handleCvClick = (cv: CV) => {
    setSelectedCv(cv);
  };

  const handleCloseModal = () => {
    setSelectedCv(null);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCVs());
  }, [dispatch]);

  const { cvs, loading } = useSelector((state: RootState) => state.cvs);

  useEffect(() => {
    let parsingError = false;
    const parsedCvs: CV[] = cvs
      .map((cv: any) => {
        try {
          const parsedCvData: Data = JSON.parse(cv?.cv_data);
          return { cv_data: parsedCvData, created_at: cv?.created_at };
        } catch (error) {
          console.error("Failed to parse data:", error);
          parsingError = true;
          return null;
        }
      })
      .filter((cv) => cv !== null) as CV[]; // Filter out any null values and cast as CV[]

    if (!parsingError) {
      setHistory(parsedCvs);
    } else {
      console.error("Failed to parse data");
    }
  }, [cvs]);

  return (
    <ProtectedRoute>
      {loading && <Loading />}
      {history?.length ? (
        <StyledList>
          {history.map((cv: CV, index: number) => (
            <ListItem button key={index} onClick={() => handleCvClick(cv)}>
              <Box display="flex" justifyContent="space-between" width="100%">
                <ListItemText
                  primary={cv.cv_data?.name ?? cv.cv_data?.fullName}
                  secondary={cv.cv_data?.profession}
                />
                <Typography>
                  {new Date(cv.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </StyledList>
      ) : !loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          flex={1}
        >
          <Image
            src={require("@/assets/empty.png")}
            alt="empty"
            width={200}
            height={200}
          />
          <Typography variant="h5">No history</Typography>
        </Box>
      )}
      <StyledModal
        open={Boolean(selectedCv)}
        onClose={handleCloseModal}
        aria-labelledby="cv-modal-title"
        aria-describedby="cv-modal-description"
      >
        <StyledBox>
          <Button
            sx={{ color: "white", position: "absolute" }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
          {selectedCv && <ResumeWeb data={selectedCv.cv_data} />}
        </StyledBox>
      </StyledModal>
    </ProtectedRoute>
  );
};

export default HistoryPage;
