import PageTemplate from "../components/templateLoginPage";

const LoginPage = ({supabaseClient}) => {

  return (
    <PageTemplate
      title="Login"
      supabaseClient={supabaseClient}
    />
  );
};
export default LoginPage;
