import React from "react";
import { Typography, Container, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import Link from "@mui/material/Link";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Resume from "./ResumePDF";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { Icon } from "@mui/material";
import ProtectedRoute from "@/hocs/AuthenticatedRoute";
import { Data } from "@/app/my-ready-cv/page";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette?.text?.secondary || "black",
  marginBottom: theme.spacing(4),
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#F3F4F6", // changed background color
  borderRadius: "15px", // added border radius
  // added a sidebar
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "5px",
    height: "100%",
    backgroundColor: "#4F46E5", // accent color
  },
}));

const StyledTitle = styled(Typography)({
  marginBottom: "24px",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "#1F2937", // changed to a slightly darker color
  borderBottom: "3px solid #3B82F6", // added a bottom border
  display: "inline-block", // needed for the border to fit the content
});

const StyledCompany = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#475569", // changed to a slightly darker color
  textDecoration: "underline", // added underline
});

const StyledPosition = styled(Typography)({
  fontStyle: "italic",
  marginBottom: "8px",
  color: "#4B5563", // changed to a slightly darker color
});

const StyledTask = styled(Typography)({
  marginLeft: "16px",
  color: "#374151", // added color
});

interface Props {
    data: Data;
}


const ResumeWeb: React.FC<Props> = ({ data }) => {
  const {
    name,
    profession,
    about,
    skills,
    experience,
    education,
    additionalProperties,
    contacts,
    fullName
  } = data || {};
  const { linkedin, github, email, phone } = contacts || {};
  const { languages, volunteerExperience } = additionalProperties || {};

  console.log(data);

  return (
    <ProtectedRoute>
      {data ? (
        <>
          <Container maxWidth="md">
            <StyledPaper elevation={3}>
              <Box
                marginBottom="24px"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4">{name ?? fullName}</Typography>
                  <Typography variant="h6">{profession}</Typography>
                  <Typography variant="body1">{about}</Typography>
                </Box>
                <Box>
                  <PDFDownloadLink
                    document={<Resume data={data} />}
                    fileName="resume.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        "Loading document..."
                      ) : (
                        <Icon>
                          <CloudDownloadOutlinedIcon />
                        </Icon>
                      )
                    }
                  </PDFDownloadLink>
                </Box>
              </Box>

              <Box marginBottom="24px">
                <StyledTitle variant="h6">Contact Info</StyledTitle>
                <Grid container spacing={2}>
                  {linkedin && (
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body1">
                        <Link
                          href={linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </Link>
                      </Typography>
                    </Grid>
                  )}
                  {github && (
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body1">
                        <Link
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </Link>
                      </Typography>
                    </Grid>
                  )}
                  {email && (
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body1">{email}</Typography>
                    </Grid>
                  )}
                  {phone && (
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body1">{phone}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
              <Box marginBottom="24px">
                <StyledTitle variant="h6">Skills</StyledTitle>
                <Grid container spacing={2}>
                  {skills?.length &&
                    skills.map((skill: any, index: number) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Typography variant="body1">{skill}</Typography>
                      </Grid>
                    ))}
                </Grid>
              </Box>
              <Box marginBottom="24px">
                <StyledTitle variant="h6">Experience</StyledTitle>
                {experience?.length &&
                  experience?.map((exp: any, index: number) => {
                    const { company, position, duration, tasks } = exp || {};
                    return (
                      <Box key={index} marginBottom="24px">
                        <StyledCompany variant="h5">{company}</StyledCompany>
                        <StyledPosition variant="subtitle1">
                          {position} ({duration})
                        </StyledPosition>
                        {tasks?.length &&
                          tasks?.map((task: any, taskIndex: number) => (
                            <StyledTask key={taskIndex} variant="body1">
                              - {task}
                            </StyledTask>
                          ))}
                      </Box>
                    );
                  })}
              </Box>
              <Box marginBottom="24px">
                <StyledTitle variant="h6">Education</StyledTitle>
                {education?.length &&
                  education?.map((edu: any, index: number) => {
                    const { school, degree, duration } = edu || {};
                    return (
                      <Box key={index} marginBottom="24px">
                        <StyledCompany variant="h5">{degree}</StyledCompany>
                        <StyledPosition variant="subtitle1">
                          {school} ({duration})
                        </StyledPosition>
                      </Box>
                    );
                  })}
              </Box>
              <Box marginBottom="24px">
                {languages && <StyledTitle variant="h6">Languages</StyledTitle>}
                <Grid container spacing={2}>
                  {languages?.length &&
                    languages.map((language: any, index: number) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Typography variant="body1">{language}</Typography>
                      </Grid>
                    ))}
                </Grid>
              </Box>
              <Box marginBottom="24px">
                {volunteerExperience?.length && (
                  <StyledTitle variant="h6">Additional Information</StyledTitle>
                )}
                {volunteerExperience?.length &&
                  volunteerExperience.map((experience: any, index: number) => (
                    <Grid item xs={12} key={index}>
                      <StyledTask variant="body1">- {experience}</StyledTask>
                    </Grid>
                  ))}
              </Box>
            </StyledPaper>
          </Container>
        </>
      ) : null}
    </ProtectedRoute>
  );
};

export default ResumeWeb;
