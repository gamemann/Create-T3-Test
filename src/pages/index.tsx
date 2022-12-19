import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { useFormik, Field, FormikProvider } from "formik";
import { useState } from 'react';
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const profiles = trpc.public.getProfile.useQuery();
  const profileSubmit = trpc.public.updateOrAddProfile.useMutation();

  const testForm = useFormik({
    initialValues: {
      name: "",
      aboutme: "",
      avatar: null,
    },

    onSubmit: (values) => {
      if (values.avatar != null)
      {
        console.log(values.avatar);
        console.log("Name => " + values.avatar.name);
      }
      
      profileSubmit.mutate(values);
    },
  });

  return (
    <>
      <Head>
        <title>Test T3 App</title>
        <meta name="description" content="My test T3 app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <FormikProvider value={testForm}>
          <form onSubmit={testForm.handleSubmit}>
            <div className="py-4 block">
              <label className="text-white mr-3" htmlFor="name">Name</label>
              <Field
                type="text"
                name="name" />
            </div>

            <div className="py-4 block">
              <label className="text-white mr-3" htmlFor="aboutme">About Me</label>
              <Field
                type="text"
                name="aboutme"
                component="textarea"
                rows="5"
                cols="15" />
            </div>

            <div className="py-4 block">
              <label className="text-white mr-3" htmlFor="aboutme">Avatar</label>
              <input
                type="file"
                name="avatar"
                className="text-white" 
                onChange={(event) => {
                  testForm.setFieldValue("avatar", event.currentTarget.files[0]);
                }}
              />
            </div>

            <div className="py-4 block">
              <button
                type="submit"
                name="Submit"
                className="text-white"
              >Update Me!</button>
            </div>
          </form>
        </FormikProvider>
      </main>
    </>
  );
};

export default Home;
