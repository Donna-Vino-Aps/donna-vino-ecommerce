"use client";
import React from "react";
import Button from "@/components/Button/Button";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="relative flex flex-col items-center bg-[#FDE8E9] min-h-screen">
      <div className="w-100  mt-20  ">
        <h1 className="relative text-headlineMedium mb-[2px] text-primary-normal text-left ml-[145px]">
          Get in Touch with Us
        </h1>

        <div className="relative bg-white mt-10 mr-20 mb-10 ml-20 rounded-2xl shadow-lg w-[1170px] h-[608px]">
          <div className="flex justify-between">
            <div className="w-1/2 pt-[30px] pr-[100px] pb-[30px] pl-[70px] ">
              <form className="flex flex-col gap-[16px]">
                <h4>
                  We’d love to hear from you! If you have any questions,
                  feedback, or need assistance, feel free to reach out. You can
                  use the contact form here, and our team will get back to you
                  as soon as possible.
                </h4>

                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Your Name"
                />

                <input
                  type="email"
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Your Email Address"
                />

                <input
                  type="tel"
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Your Phone Number"
                />

                <textarea
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>

                <Button text="Send Message" variant="greenSubmit" />
              </form>
            </div>

            <Image
              src="/shapes.svg"
              width={600}
              height={608}
              alt="wine glasses"
            ></Image>
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="w-full bg-white pt-[80px] pr-[135px] pb-[80px] pl-[135px]">
        <div className="mt-10 w-[1170px] h-[536px] bg-tertiary1-light rounded-[32px]">
          <div className="flex justify-between">
            <div className="w-1/2 ">
              <iframe
                title="Google Map"
                className="rounded-tl-[32px] rounded-bl-[32px] w-[570px] h-[536px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531550407!3d-37.81627944202178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1607552409631!5m2!1sen!2sau"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="w-1/2 h-[536px] p-[32px] gap-[32px]">
              <h1 className="text-tertiary1-darker font-semibold text-labelXLarge">
                Where can you find us?
              </h1>
              <div className="w-100">
                <div className="flex gap-[24px]">
                  <div className="bg-secondary-active w-[70px] h-[70px] round-[5px] ">
                    <img
                      className="relative w-[32px] h-[32px] top-[19px] left-[19px]"
                      src="./icons/contact/house-alt-1.svg"
                    ></img>
                  </div>
                  <div className="flex-column items-center justify-center gap-[10px]">
                    <h5 className="text-tertiary1-darker font-semibold ">
                      Our Location
                    </h5>
                    <h6 className="text-tertiary1-dark">
                      Wildersgade, 23 | 1408 København K
                    </h6>
                  </div>
                </div>
                <div>
                  <h5 className="text-tertiary1-darker font-semibold">
                    Phone Number
                  </h5>
                  <h6 className="text-tertiary1-dark">+45 12 34 56 78</h6>
                </div>
                <div>
                  <h5 className="text-tertiary1-darker font-semibold">
                    Email Address
                  </h5>
                  <h6 className="text-tertiary1-dark">info@donnavino.dk</h6>
                </div>
              </div>
              <div className="w-100">
                <Button text="Send Message" variant="greenSubmit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
