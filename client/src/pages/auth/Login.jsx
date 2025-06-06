import CommonForm from "@/components/common/form";
import { toast } from "sonner";
import { loginFormControls } from "../../components/controls/index";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();;

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Login successful!"); // Fallback message
      } else {
        toast.error(data?.payload?.message || "Login failed."); // Fallback message
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="flex justify-evenly gap-3">
    <div className="text-center w-[60%] flex flex-col mx-auto gap-2 border-2 border-slate-600">
      Login Credentials (User)
      <p>Email: <span className="font-bold">ab@gmail.com </span></p>
       <p>Password: <span className="font-bold">1234</span></p>
    </div>

        <div className="text-center w-[75%] flex flex-col mx-auto gap-2 border-2 border-slate-600">
      Login Credentials (Admin) read only
      <p>Email: <span className="font-bold">sarang@gmail</span></p>
       <p>Password: <span className="font-bold">sarang</span></p>
    </div>

      </div>



      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Log In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;