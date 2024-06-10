import React from "react";

function DefaultDisplay() {
  return (
    <div className="mt-2 defaultDisp    flex flex-col items-center justify-center">
      <h1 className="mb-4  mt-2 text-3xl text-yellow-100  font-semibold">
        Welcome to Weather App. Search for Your City :)
      </h1>

      <img
        className="w-1/3   rounded-full"
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjlmbGt3aXNoMTZ0MXAyam9xMTc0ZWpzaWc1OWh6YTg3MmU4aDk0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l5JbspfwZ0yjHjlJ0K/giphy.gif"
        alt="Globe animation"
      />
    </div>
  );
}

export default DefaultDisplay;
