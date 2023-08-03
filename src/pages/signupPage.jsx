import PageTemplate from "../components/templateSignupPage";

const SignupPage = ({supabaseClient}) => {

  return (
    <PageTemplate
      title="Signup"
      supabaseClient={supabaseClient}
    />
  );
};
export default SignupPage;
