import { Box } from "@mui/material";

type ErrorCompProps = {
  title: string;
  subTitle?: string;
  description?: string;
  needButton?: boolean;
};
export default function ErrorComp({ title, subTitle, description, needButton }: ErrorCompProps) {
  return (
    <section className="p-[0]">
      <div className="container">
        <div className="row">
          <div className="">
            <div className="text-center flex items-center justify-center">
              <Box className="w-[800px]">
                <div className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[400px] bg-center">
                  <h1 className="text-center text-4xl pt-[10px]">{title}</h1>
                </div>
                <div className="">
                  {subTitle && <h3 className="h2 text-3xl">{subTitle}</h3>}

                  {description && <p>{description}</p>}

                  {needButton && (
                    <a href="" className="text-white py-[10px] px-[20px] bg-[#39ac31] my-[20px] mx-[0] inline-block">
                      Go to Home
                    </a>
                  )}
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
