export interface Field {
  label: string;
  multiline: boolean;
  fieldKey: string;
  rows: number;
}

export interface Step {
  step_number: number;
  title: string;
  fields?: Field[];
}

const step1: Step = {
  step_number: 1,
  title: "Personal Information",
  fields: [
    {
      label: "Full Name",
      multiline: false,
      fieldKey: "fullName",
      rows: 1,
    },
    {
      label: "Email",
      multiline: false,
      fieldKey: "email",
      rows: 1,
    },
    {
      label: "Phone Number",
      multiline: false,
      fieldKey: "phoneNumber",
      rows: 1,
    },
    {
      label: "Github",
      multiline: false,
      fieldKey: "github",
      rows: 1,
    },
    {
      label: "Linkedin",
      multiline: false,
      fieldKey: "linkedin",
      rows: 1,
    },
  ],
};

const step2: Step = {
  step_number: 2,
  title: "Education",
  fields: [
    {
      label: "Degree, Major, Institution, Graduation Year and GPA",
      multiline: true,
      fieldKey: "degree",
      rows: 5,
    },
    {
      label: "Courses",
      multiline: true,
      fieldKey: "courses",
      rows: 5,
    },
  ],
};

const step3: Step = {
  step_number: 3,
  title: "Certifications and Achievements",
  fields: [
    {
      label: "Certifications",
      multiline: true,
      fieldKey: "certifications",
      rows: 4,
    },
    {
      label: "Achievements",
      multiline: true,
      fieldKey: "achievements",
      rows: 4,
    },
  ],
};

const step4: Step = {
  step_number: 4,
  title: "Work Experience",
  fields: [
    {
      label: "Company Name, Position, Start Date, End Date, Description",
      multiline: true,
      fieldKey: "workExperience",
      rows: 12,
    },
  ],
};

const step5: Step = {
  step_number: 5,
  title: "Languages and Interests",
  fields: [
    {
      label: "Languages",
      multiline: true,
      fieldKey: "languages",
      rows: 4,
    },
    {
      label: "Interests",
      multiline: true,
      fieldKey: "interests",
      rows: 4,
    },
  ],
};

const step6: Step = {
  step_number: 6,
  title: "Additional Information",
  fields: [
    {
      label: "Additional Information",
      multiline: true,
      fieldKey: "additionalInfo",
      rows: 4,
    },
  ],
};

const step7 = {
  step_number: 7,
  title: "Chat",
  key: "chat",
}

export const steps: Step[] = [step1, step2, step3, step4, step5, step6, step7];
