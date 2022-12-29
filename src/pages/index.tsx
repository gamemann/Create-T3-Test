import { type NextPage } from "next";
import Head from "next/head";

import { useFormik, Field, FormikProvider } from "formik";
import { useState } from 'react';
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const profiles = trpc.profile.getProfile.useQuery();
  const profileSubmit = trpc.profile.updateOrAddProfile.useMutation();

  const [avatar, setAvatar] = useState<File | null>(null);

  const testForm = useFormik({
    initialValues: {
      name: "",
      aboutme: ""
    },

    onSubmit: (values) => {
      if (avatar != null) {
        const reader = new FileReader();

        reader.onload = () => {
          const fileData = reader.result;

          let newVals: { name: string; aboutme: string; avatarName?: string; avatarData?: string; } = {
            name: values.name,
            aboutme: values.aboutme,
            avatarName: avatar.name,
            avatarData: fileData
          }

          profileSubmit.mutate(newVals);
        };

        reader.readAsDataURL(avatar);

      } else {
        let newVals: { name: string; aboutme: string; avatarName?: string; avatarData?: string; } = {
          name: values.name,
          aboutme: values.aboutme,
          avatarName: null,
          avatarData: null
        }
        
        profileSubmit.mutate(newVals);
      }
    }
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
                  setAvatar(event.currentTarget.files[0]);
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
