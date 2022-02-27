import { Request, Response } from "express";
import CreatCourseService from "./CreatCourseService";


export function createCourse(request: Request, response: Response){

  CreatCourseService.execute({
    name: "NodeJS",
    educator: "Rafael"
  })

  return response.send()
}