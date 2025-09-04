"use client";
import { createContext } from "react";
import { Context } from "../_types/types";
const createcontext = createContext<Context | null>(null);

export default createcontext;
