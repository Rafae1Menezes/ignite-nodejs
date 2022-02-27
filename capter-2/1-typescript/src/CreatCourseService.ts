
/**
 * name - string
 * duration - number
 * educator - string
 */

interface Course {
  name: string 
  duration?: number 
  educator: string
}

class CreatCourseService {

  execute({ name, duration = 8, educator }: Course){
    console.log(name, duration, educator)
  }
}

export default new CreatCourseService()