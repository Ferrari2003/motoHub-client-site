import { Footer } from "flowbite-react";
import logo from "../../../Assets/brand-logo.svg";
import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
const FooterMain = () => {
  return (
    <Footer container={true} className="bg-gray-200 mt-5 ">
      <div className="container mx-auto py-7">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="w-28 lg:w-24 pb-5 md:pb-0">
            <Link to="/">
              <img src={logo} alt="footer logo" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Menu" />
              <Footer.LinkGroup col={true}>
                <Link to="/">Home</Link>
                <Link to="/category/1">Products</Link>
                <Link to="blog">Blog</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col={true}>
                <Link>Github</Link>
                <Link>Discord</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col={true}>
                <Link>Privacy Policy</Link>
                <Link>Terms & Conditions</Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="MotoHub™ by Al-Amin Hossain" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-gray-600">
            <Link>
              <BsInstagram></BsInstagram>
            </Link>
            <Link>
              <BsFacebook />
            </Link>
            <Link>
              <BsTwitter></BsTwitter>
            </Link>
            <Link>
              <BsLinkedin></BsLinkedin>
            </Link>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterMain;
