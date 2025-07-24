import { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import { slideComponents } from "@/lib/slideMap";
import SliderContainer from "@/components/Slider/SliderContainer";
import React, { Suspense } from "react";

export default function SlidePage({ slidesMeta, course, initialSlideSlug }) {
  // Map each slide to include the actual React component
  const slides = slidesMeta.map((slide) => {
    const loader =
      slideComponents?.[slide.courseSlug]?.[slide.categorySlug]?.[slide.slug];

    return {
      ...slide,
      content: loader
        ? React.createElement(React.lazy(loader))
        : () => <p>Slide not found</p>,
    };
  });

  // Find the index based on slug from URL
  const initialIndex = slides.findIndex((s) => s.slug === initialSlideSlug);

  return (
    <Suspense fallback={<p>Loading slide...</p>}>
      <div className="page-container">
      <SliderContainer
        slides={slides}
        course={course}
        onComplete={() => console.log("Course completed!")}
        initialIndex={initialIndex !== -1 ? initialIndex : 0}
      />

      </div>
    </Suspense>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug, slide: currentSlideSlug } = context.params as {
    slug: string;
    category: string;
    slide: string;
  };

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      categories: {
        include: {
          slides: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!course || course.categories.length === 0) {
    return { notFound: true };
  }

  const allSlides = course.categories.flatMap((cat) =>
    cat.slides.map((slide) => ({
      ...slide,
      courseSlug: slug,
      categorySlug: cat.slug,
      category: cat.title, // used by Sidebar
    }))
  );


  return {
    props: {
      slidesMeta: allSlides,
      course: {
        title: course.title,
        slug: course.slug,
        category: "", // optional if you need to display active category name
      },
      initialSlideSlug: currentSlideSlug,
    },
  };
};
