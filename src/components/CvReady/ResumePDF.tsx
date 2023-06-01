import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { Data } from "@/app/my-ready-cv/page";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
    padding: "20 40",
    fontFamily: "Helvetica",
    fontSize: 12,
  },

  contacts: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 2,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2f4f4f",
  },
  profession: {
    fontSize: 22,
    textAlign: "center",
    color: "#4682b4",
  },
  about: {
    fontSize: 12,
    lineHeight: 1.4,
    textAlign: "justify",
    color: "#333333",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    display: "flex",
    marginBottom: 10,
    // borderBottom: "3px solid #3B82F6",
    textDecoration: "underline",
    textDecorationColor: "#3B82F6",
    textTransform: "uppercase",
    color: "#1F2937", // changed to a slightly darker color
  },
  content: {
    fontSize: 12,
    lineHeight: 1.4,
    color: "#333333",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 5,
  },
  link: {
    color: "#4682b4",
    textDecoration: "none",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginTop: 10,
    marginBottom: 10,
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderLeftColor: "#000000",
    margin: "0 10",
    height: 12,
  },
  jobTitle: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#2f4f4f",
  },
});

interface Props {
  data: Data;
}

const Resume: React.FC<Props> = ({ data }) => {
  const {
    name,
    profession,
    about,
    skills,
    experience,
    education,
    additionalProperties,
    contacts,
    fullName,
  } = data || {};
  const { linkedin, github, email, phone } = contacts || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{name ?? fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
          <View style={styles.contacts}>
            {linkedin && (
              <>
                <Link src={linkedin} style={styles.link}>
                  LinkedIn
                </Link>
                <View style={styles.verticalLine} />
              </>
            )}
            {github && (
              <>
                <Link src={github} style={styles.link}>
                  GitHub
                </Link>
                <View style={styles.verticalLine} />
              </>
            )}
            {email && (
              <>
                <Text style={styles.content}>{email}</Text>
                <View style={styles.verticalLine} />
              </>
            )}
            {phone && (
              <>
                <Text style={styles.content}>{phone}</Text>
                <View style={styles.verticalLine} />
              </>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.about}>{about}</Text>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.title}>Skills</Text>
          <View style={styles.jobTitle}>
            {skills?.length &&
              skills.map((skill, index) => {
                return (
                  <>
                    {index !== 0 && <View style={styles.verticalLine} />}
                    <Text style={styles.content}>{`${skill}`}</Text>
                  </>
                );
              })}
          </View>
        </View>

        <View style={styles.divider} />

        <View>
          <View>
            <Text style={styles.title}>Education</Text>
          </View>
          {education?.length &&
            education.map((edu, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.content}>{edu.institution}</Text>
                {edu.institution && edu.degree && (
                  <View style={styles.verticalLine} />
                )}
                <Text style={styles.content}>{edu.degree}</Text>
                {(edu.duration || edu.institution) && (
                  <View style={styles.verticalLine} />
                )}
                <Text style={styles.content}>{edu.duration}</Text>
              </View>
            ))}
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.title}>Experience</Text>
          {experience?.length &&
            experience.map((exp, index) => (
              <View key={index}>
                <View style={styles.jobTitle}>
                  <Text style={styles.content}>{exp.company}</Text>
                  {exp.company && exp.position && (
                    <View style={styles.verticalLine} />
                  )}
                  <Text style={styles.content}>{exp.position}</Text>
                  {(exp.duration || exp.company) && (
                    <View style={styles.verticalLine} />
                  )}
                  <Text style={styles.content}>{exp.duration}</Text>
                </View>
                {exp?.tasks?.length &&
                  exp.tasks.map((task, index) => (
                    <View key={index} style={styles.bulletPoint}>
                      <Text style={styles.content}>{`- ${task}`}</Text>
                    </View>
                  ))}
              </View>
            ))}
        </View>

        <View style={styles.divider} />

        {additionalProperties && Object.keys(additionalProperties)?.length && (
          <>
            <Text style={styles.title}>Additional Information</Text>
            {Array.isArray(additionalProperties?.languages) &&
              additionalProperties?.languages?.length > 0 && (
                <Text
                  style={styles.content}
                >{`Languages: ${additionalProperties?.languages.join(
                  ", "
                )}`}</Text>
              )}
            {Array.isArray(additionalProperties?.volunteerExperience) &&
              additionalProperties?.volunteerExperience?.length > 0 && (
                <Text
                  style={styles.content}
                >{`Volunteer Experience: ${additionalProperties.volunteerExperience.join(
                  ", "
                )}`}</Text>
              )}
          </>
        )}
      </Page>
    </Document>
  );
};

export default Resume;
