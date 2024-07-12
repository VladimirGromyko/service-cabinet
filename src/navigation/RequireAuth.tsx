import {ReactNode} from "react";
import Link from "next/link";
import {PATH} from "@/navigation/Paths";

type RequireAuthType = {
  children: ReactNode;
};
const RequireAuth: React.FC<RequireAuthType> = ({ children }) => {
  // if (!meStatus) {
  if (!true) {
    return <Link to={PATH.LOGIN} />;
  }
  return <Layout>{children}</Layout>;
};

export default RequireAuth;
