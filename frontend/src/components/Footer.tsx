import { Link } from "react-router-dom";
import { Text, TextMuted } from "./Text";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer" id="contact">
      <div className="w-full theme-bg">
        <div className="p-4 md:p-8 xl:p-10">
          <div className="md:grid md:grid-cols-4 md:gap-2">
            <div className="mb-8 col-1 col-span-2">
              <Text className="font-bold text-cyan-700 text-5xl text-shadow-xl">
                FPTB
              </Text>
              <TextMuted className="font-weight-600 text-2xl">
                Inventory Management System Store
              </TextMuted>
              <Text className="text-xl">Federal Polytechnic Bauchi</Text>
            </div>
            <div className="mb-8 col-2 col-span-1">
              <Text className="font-bold text-cyan-700 text-xl text-shadow-xl">
                Useful Links
              </Text>
              <ul className="mt-6">
                <li className="mb-4">
                  <span className="fa fa-link font-weight-900 text-cyan-700 text-md"></span>
                  &nbsp;
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="mb-4">
                  <span className="fa fa-link font-weight-900 text-cyan-700 text-md"></span>
                  &nbsp;
                  <Link to={"https://fptb.edu.ng"}>Main website</Link>
                </li>
                <li className="mb-4">
                  <span className="fa fa-link font-weight-900 text-cyan-700 text-md"></span>
                  &nbsp;
                  <Link to={"https://portal.fptb.edu.ng"}>Portal</Link>
                </li>
                {/* <li className="mb-4">
                  <span className="fa fa-link font-weight-900 text-cyan-700 text-md"></span>
                  &nbsp;
                  <Link to={"/schools"}>Schools</Link>
                </li>
                <li className="mb-4">
                  <span className="fa fa-link font-weight-900 text-cyan-700 text-md"></span>
                  &nbsp;
                  <Link to={"/staffs"}>Staffs</Link>
                </li> */}
                <li className="mb-4">
                  <span className="fa fa-link font-weight-900 text-cyan-700 text-md"></span>
                  &nbsp;
                  <Link to={"/admin/login"}>Admin login</Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 col-3 col-span-1">
              <Text className="font-bold text-cyan-700 text-xl text-shadow-xl">
                Contact
              </Text>
              <ul>
                <li className="flex">
                  <i className="bi bi-geo-alt-fill font-weight-800 text-cyan-700 mr-2 text-xl" />
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <address>Federal Polytechnic Bauchi</address>
                  </div>
                </li>
                <li className="flex">
                  <i className="fa fa-phone font-weight-800 text-cyan-700 mr-2 text-xl" />
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <span className="text-sm">
                      <li>+2348199934844</li>
                      <li>+2349124889988</li>
                    </span>
                  </div>
                </li>
                <li className="flex">
                  <i className="fa fa-envelope font-weight-800 text-cyan-700 mr-2 text-xl" />
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>
                      <a href="mailto:support@fptb.edu.ng">
                        support@fptb.edu.ng
                      </a>
                    </p>
                    <p>
                      <a href="mailto:info@fptb.edu.ng">info@fptb.edu.ng</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <TextMuted className="text-center mt-8">
            &copy; Copyright {year}
          </TextMuted>
        </div>
      </div>
    </div>
  );
};

export default Footer;
