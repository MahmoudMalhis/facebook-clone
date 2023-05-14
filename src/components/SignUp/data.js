import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Typography } from "@mui/material";

export const dataHeader = [
  {
    id: 1,
    label: "Create a new account",
    component: "div",
  },
  {
    id: 2,
    label: "It’s quick and easy.",
    component: "div",
  },
];

const dayOption = [];
for (let i = 1; i <= 31; i++) {
  dayOption.push({
    value: i,
    label: i.toString(),
  });
}
const yearOption = [];
for (let i = 2023; i >= 1905; i--) {
  yearOption.push({
    value: i,
    label: i.toString(),
  });
}
export const dataTextField = [
  {
    id: 1,
    placeholder: "First Name",
    fullWidth: false,
    type: "text",
    value: "fName",
    onChange: (e) => {},
  },
  {
    id: 2,
    placeholder: "Last Name",
    fullWidth: false,
    type: "text",
    value: "lName",
    onChange: (e) => {},
  },
  {
    id: 3,
    placeholder: "Mobile number or email",
    fullWidth: true,
    type: "email",
    value: "email",
    onChange: (e) => {},
  },
  {
    id: 4,
    placeholder: "New password",
    fullWidth: true,
    type: "password",
    value: "password",
    onChange: (e) => {},
  },
  {
    id: 5,
    fullWidth: true,
    isSelect: true,
    value: "selectedMonth",
    onChange: (e) => {},
    option: [
      {
        value: "Jan",
        label: "Jan",
      },
      {
        value: "Fab",
        label: "Fab",
      },
      {
        value: "Mar",
        label: "Mar",
      },
      {
        value: "Apr",
        label: "Apr",
      },
      {
        value: "May",
        label: "May",
      },
      {
        value: "Jun",
        label: "Jun",
      },
      {
        value: "Jul",
        label: "Jul",
      },
      {
        value: "Aug",
        label: "Aug",
      },
      {
        value: "Sep",
        label: "Sep",
      },
      {
        value: "Oct",
        label: "Oct",
      },
      {
        value: "Nov",
        label: "Nov",
      },
      {
        value: "Dec",
        label: "Dec",
      },
    ],
  },
  {
    id: 6,
    fullWidth: true,
    isSelect: true,
    value: "selectedDay",
    onChange: (e) => {},
    option: dayOption,
  },

  {
    id: 7,
    fullWidth: true,
    isSelect: true,
    value: "selectedYear",
    onChange: (e) => {},
    option: yearOption,
  },
  {
    id: 8,
    fullWidth: false,
    label: "Female",
    value: "female",
    gender: "gender",
    isRadio: true,
    onChange: (e) => {},
  },
  {
    id: 9,
    fullWidth: false,
    label: "Male",
    value: "male",
    gender: "gender",
    isRadio: true,
    onChange: (e) => {},
  },
  {
    id: 10,
    fullWidth: false,
    label: "Custom",
    value: "custom",
    gender: "gender",
    isRadio: true,
    onChange: (e) => {},
  },
  {
    id: 11,
    label: "Sign Up",
    type: "submit",
    isRadio: false,
  },
];

const learnMoreLink = (
  <a href="/learn-more" target="_blank" rel="noopener noreferrer">
    Learn more
  </a>
);
const Terms = (
  <a href="/learn-more" target="_blank" rel="noopener noreferrer">
    Terms
  </a>
);
const Privacy = (
  <a href="/learn-more" target="_blank" rel="noopener noreferrer">
    Privacy Policy
  </a>
);
const Cookies = (
  <a href="/learn-more" target="_blank" rel="noopener noreferrer">
    Privacy Policy
  </a>
);

export const data = [
  {
    id: 1,
    label: "Birthday",
    variant: "body1",
    question: <QuestionMarkIcon />,
  },
  {
    id: 2,
    label: "Gender",
    variant: "body1",
    question: <QuestionMarkIcon />,
  },
  {
    id: 3,
    label: (
      <Typography variant="body1">
        {`People who use our service may have uploaded your contact information to Facebook. `}
        {learnMoreLink}
        {`.`}
      </Typography>
    ),
  },
  {
    id: 4,
    label: (
      <Typography variant="body1">
        {`By clicking Sign Up, you agree to our`} {Terms}
        {"."} {Privacy} {"and"} {Cookies}{" "}
        {`You may receive SMS Notifications from us and can opt out any time.`}
      </Typography>
    ),
  },
  {
    id: 5,
    label: "Already have an account?",
    variant: "anchor",
  },
];
