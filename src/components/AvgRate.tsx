import React, { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

type Props = {
  avgrate: number;
};

export default function Review({ avgrate }: Props) {
  const Lazy = lazy(() => import("./Lazy"));
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Lazy />
      <div>
        <Box
          sx={{
            "& > legend": { mt: 5 },
          }}
        >
          <Typography component="legend"></Typography>
          <Rating name="read-only" value={avgrate} readOnly />
        </Box>
      </div>
    </Suspense>
  );
}
