import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl justify-center items-center p-8 sm:p-10 md:p-12 lg:p-14 lg:max-w-[47.75rem] xl:p-16 shadow-lg my-8">
      <img
        src="/images/donna-vino-logo-transparent.png"
        alt="Donna Vino logo"
        className="w-[6.25rem] h-[4.31rem] mb-8"
      />
      <div>
        <img
          src="/images/Avatar.jpg"
          alt="Profile picture"
          className="w-[9.375rem] h-[9.375rem] rounded-full"
        />
        <img
          src="/icons/Edit profile pic.svg"
          className="relative w-6 h-6 bottom-8 left-[6.75rem]"
        />
      </div>
      <h2 className="text-displaySmall">Davide Rossi</h2>
      <p className="text-labelLarge mt-2">Denmark</p>
      <h3 className="text-headlineSmall self-start">Personal Details</h3>
    </div>
  );
};

export default Profile;
