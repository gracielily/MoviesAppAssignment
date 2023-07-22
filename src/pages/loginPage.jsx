import PageTemplate from "../components/templateLoginPage";

const LoginPage = ({handleLogin, supabaseClient}) => {

  return (
    <PageTemplate
      title="Login"
      supabaseClient={supabaseClient}
    />
  );
};
export default LoginPage;
