// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

// namespace dotnetapp.Controllers
// {
//     public class AdminController
//     {
        
//     }
// }

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyProjectDbContext dc;
        public AdminController(MyProjectDbContext dc)
        {
            this.dc = dc;

        }

        //Get student details by id
        [HttpGet("ViewStudent/{StudentId}")]
        public async Task<IActionResult> viewstudent(int StudentId)
        {

            var student = await dc.StudentModels.FindAsync(StudentId);
            if (student == null)
            {
                return BadRequest("No student found");
            }
            return Ok(student);


        }
        //get all student details
        [HttpGet("viewStudents")]
        public async Task<IActionResult> viewStudents()
        {
            var students = await dc.StudentModels.ToListAsync();
            if (students == null || students.Count == 0)
            {
                return NotFound("No institutes found");
            }

            return Ok(students);
        }

        // post student details
        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent(StudentModel student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await dc.StudentModels.AddAsync(student);
                await dc.SaveChangesAsync();
                return Ok("Student added");
            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the student.");
            }
        }

        //delete student 
        //[HttpDelete("Deletestudent/{studentId}")]

        [HttpDelete("Deletestudent/{studentId}")]
        public async Task<IActionResult> DeleteStudent(int studentId)
        {
            var student = await dc.StudentModels.FindAsync(studentId);

            if (student == null)
            {
                return NotFound(); // Student not found
            }

            var dependentAdmissions = await dc.AdmissionModels
                .Where(a => a.StudentId == studentId)
                .ToListAsync();

            if (dependentAdmissions.Count > 0)
            {
                return Conflict("Cannot delete student because they have associated admissions."); // Conflict error
            }

            dc.StudentModels.Remove(student);
            await dc.SaveChangesAsync();
            return Ok("Student Deleted");
        }

        // public async Task<IActionResult> DeleteStudent(int studentId)
        // {
        //     var student = await dc.StudentModels.FindAsync(studentId);
        //     // try
        //     // {
        //     //     var student = await dc.StudentModels.FindAsync(studentId);
        //     //     if (student == null)
        //     //     {

        //     //         return NotFound(" No student Found");
        //     //     }


        //         dc.StudentModels.Remove(student);
        //         await dc.SaveChangesAsync();
        //         return Ok("Student Deleted");
        //     }
        //     // catch
        //     // {
        //     //     return StatusCode(500, "An error accoured while deleting the student.");
        //     // }


        //edit student details
        [HttpPut("EditStudent/{id}")]
        public async Task<IActionResult> EditStudent(int id, StudentModel student)
        {
            try
            {
                if (id != student.StudentId)
                {
                    return BadRequest(" Update Not Allowed");
                }

                var std = await dc.StudentModels.FindAsync(id);
                if (std == null)
                {
                    return BadRequest("Update Not allowed");
                }
                std.FirstName = student.FirstName;
                std.LastName = student.LastName;
                std.Nationality = student.Nationality;
                std.FatherName = student.FatherName;
                std.MotherName = student.MotherName;
                std.Gender = student.Gender;
                std.Age = student.Age;
                std.Mobile = student.Mobile;
                std.AlternateMobile = student.AlternateMobile;
                std.Email = student.Email;
                std.CourseId = student.CourseId;
                std.HouseNo =student.HouseNo;
                std.StreetName = student.StreetName;
                std.Pincode = student.Pincode;
                std.AreaName = student.AreaName;
                std.State = student.State;

                

                dc.StudentModels.Update(std);
                await dc.SaveChangesAsync();
                return Ok("Student Updated");
            }
            catch
            {
                return StatusCode(500, "An error accoured while editing the student.");
            }

        }
        //delete multiple students
        [HttpDelete("DeleteStudents")]
        public async Task<IActionResult> DeleteStudents([FromBody] List<int> studentIds)
        {
            try
            {
                var students = await dc.StudentModels.Where(i => studentIds.Contains(i.StudentId)).ToListAsync();
                if (students.Count == 0)
                {
                    return NotFound(); // Return 404 Not Found if no institutes with the given IDs are found
                }

                dc.StudentModels.RemoveRange(students);
                await dc.SaveChangesAsync();

                return Ok(new { Status = "Success", Count = students.Count }); // Return success status and the count of deleted institutes
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during the delete operation
                // Log the exception or return a meaningful error message, based on your application's requirements
                return StatusCode(500, $"An error occurred while deleting the institutes: {ex.Message}");
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //COURSE

        //Get course details by id
        [HttpGet("ViewCourse/{courseId}")]
        public async Task<IActionResult> viewCourse(int courseId)
        {

            var course = await dc.CourseModels.FindAsync(courseId);
            if (course == null)
            {
                return NotFound("No course found");
            }
            return Ok(course);


        }
        //get all course details
        [HttpGet("viewCourse")]
        public async Task<IActionResult> ViewCourse()
        {
            var courses = await dc.CourseModels.ToListAsync();
            if (courses == null || courses.Count == 0)
            {
                return NotFound("No courses found");
            }

            return Ok(courses);
        }

        // post course details
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse(CourseModel course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {

                dc.CourseModels.Add(course);
                await dc.SaveChangesAsync();
                return Ok("Course added");

            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the course.");
            }
        }

        //delete Course
        [HttpDelete("DeleteCourse/{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            var course = await dc.CourseModels.FindAsync(courseId);
            try
            {
                //var course = await dc.CourseModels.FindAsync(courseId);
                if (course == null)
                {
                    return BadRequest("Course Not Found");
                }
            dc.CourseModels.Remove(course);
            await dc.SaveChangesAsync();
            return Ok("Course Deleted");

        }
        catch 
        {
            return StatusCode(500, "An error accoured while deleting the course.");
        }
        }



        //edit Course details
        [HttpPut("EditCourse/{id}")]
        public async Task<IActionResult> EditCourse(int id, CourseModel course)
        {
            try
            {
                if (id != course.CourseId)
                {
                    return BadRequest(" Update not allowed");
                }

                var std = await dc.CourseModels.FindAsync(id);
                if (std == null)
                {
                    return BadRequest("Update Not Allowed");
                }
                std.CourseName = course.CourseName;
                std.CourseDescription = course.CourseDescription;
                std.CourseDuration = course.CourseDuration;
                std.CourseTiming = course.CourseTiming;
                //std.NumberofStudents = course.NumberofStudents;
                std.InstituteId = course.InstituteId;



                dc.CourseModels.Update(std);
                await dc.SaveChangesAsync();
                return Ok(std);
            }
            catch
            {
                return StatusCode(500, "An error accoured while updateing the course.");
            }

        }

        //delete mutiple courses
        [HttpDelete("DeleteCourses")]
        public async Task<IActionResult> DeleteCourses([FromBody] List<int> courseIds)
        {
            try
            {
                var courses = await dc.CourseModels.Where(i => courseIds.Contains(i.CourseId)).ToListAsync();
                if (courses.Count == 0)
                {
                    return NotFound(); // Return 404 Not Found if no institutes with the given IDs are found
                }

                dc.CourseModels.RemoveRange(courses);
                await dc.SaveChangesAsync();

                return Ok(new { Status = "Success", Count = courses.Count }); // Return success status and the count of deleted institutes
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during the delete operation
                // Log the exception or return a meaningful error message, based on your application's requirements
                return StatusCode(500, $"An error occurred while deleting the institutes: {ex.Message}");
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //isntitute

        // Get institute details by id
        [HttpGet("ViewInstitute/{instituteId}")]
        public async Task<IActionResult> viewInstitute(int instituteId)
        {

            var institute = await dc.InstituteModels.FindAsync(instituteId);
            if (institute == null)
            {
                return NotFound("No institute found");
            }
            return Ok(institute);


        }
        //get all Institute details
        [HttpGet("viewInstitutes")]
        public async Task<IActionResult> viewInstitutes()
        {
            var institutes = await dc.InstituteModels.ToListAsync();
            if (institutes == null || institutes.Count == 0)
            {
                return NotFound("No institutes found");
            }

            return Ok(institutes);
        }

        // post Institute details
        [HttpPost("addInstitute")]
        public async Task<IActionResult> addInstitute(InstituteModel institute)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await dc.InstituteModels.AddAsync(institute);
                await dc.SaveChangesAsync();
                return Ok("Institute added");
            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the institute.");
            }
        }


        [HttpDelete("DeleteInstitute/{instituteId}")]
        public async Task<IActionResult> DeleteInstitute(int instituteId)
        {
            var institute = await dc.InstituteModels.Include(i => i.CourseModels).FirstOrDefaultAsync(i => i.InstituteId == instituteId);

            if (institute == null)
            {
                return NotFound(); // Institute not found
            }

            dc.InstituteModels.Remove(institute);
            await dc.SaveChangesAsync();

            return Ok("Institute Deleted");
        }


        //delete Institute
        // [HttpDelete("DeleteInstitute/{instituteId}")]
        // public async Task<IActionResult> DeleteInstitute(int instituteId)
        // {
        //     var institute = await dc.InstituteModels.FindAsync(instituteId);
        //     // try
        //     // {
        //     //     var institute = await dc.InstituteModels.FindAsync(instituteId);
        //     //     if (institute == null)
        //     //     {
        //     //         return NotFound(" No Institute Found");
        //     //     }
        //         dc.InstituteModels.Remove(institute);
        //         await dc.SaveChangesAsync();
        //         return Ok("Institute Deleted");
        //         //return Context
        //     // }
        //     // catch
        //     // {
        //     //     return StatusCode(500, "An error accoured while deleting the institute.");
        //     // }
        // }

        //edit Institute details
        [HttpPut("editInstitute/{id}")]
        public async Task<IActionResult> EditInstitute(int id, InstituteModel institute)
        {
            try
            {
                if (id != institute.InstituteId)
                {
                    return BadRequest(" Update Not Allowed");
                }
                var std = await dc.InstituteModels.FindAsync(id);
                if (std == null)
                {
                    return BadRequest("Update Not allowed");
                }


                std.InstituteName = institute.InstituteName;
                std.InstituteDescription = institute.InstituteDescription;
                std.InstituteAddress = institute.InstituteAddress;
                std.Email = institute.Email;
                std.Mobile = institute.Mobile;
                std.ImageUrl = institute.ImageUrl;



                dc.InstituteModels.Update(std);
                await dc.SaveChangesAsync();
                return Ok("Institute Edited");
            }
            catch
            {
                return StatusCode(500, "An error accoured while editing the institute.");
            }
        }

        //////////////////////////////////////////////////////////////////////////////
        //Get courses offered by institute

        [HttpGet("viewcoursebyId/{InstId}")]
        public IActionResult viewcoursebyId(int InstId)
        {
            // var instCourse= await dc.Course.FindAsync(InstituteId);

            // //var users = await dc.Student.ToListAsync();
            // if (institute == null)
            // {
            //     return NotFound();
            // }
            // return Ok(institute);

            var instCourse = (from Inst in dc.InstituteModels
                              from Cour in dc.CourseModels
                              where Inst.InstituteId == Cour.InstituteId && Cour.InstituteId == InstId
                              select new
                              {
                                  CourseName = Cour.CourseName,
                                  CourseDescription = Cour.CourseDescription,
                                  CourseDuration = Cour.CourseDuration,
                                  CourseTiming = Cour.CourseTiming,
                                  //ns = Cour.NumberofStudents,
                                  InstituteId = Cour.InstituteId


                              }).ToList();

            return Ok(instCourse);
        }

        [HttpPost("AddStudentbycourse")]
        public async Task<IActionResult> AddStudentbycourse(StudentModel student, int courseId)
        {
            student.CourseId = courseId;
            await dc.StudentModels.AddAsync(student);
            await dc.SaveChangesAsync();
            return Ok(student);
        }

        // [HttpPut("EditStudentbycourse/{id}/{courseId}")]
        // public async Task<IActionResult> EditStudentbycourse(int id, StudentModel student, int courseId)
        // {
        //     var std = await dc.StudentModels.FindAsync(id);
        //     if (std != null)
        //     {
        //         std.FirstName = student.FirstName;
        //         std.LastName = student.LastName;
        //         std.Nationality = student.Nationality;
        //         std.FatherName = student.FatherName;
        //         std.MotherName = student.MotherName;
        //         std.Gender = student.Gender;
        //         std.Age = student.Age;
        //         std.Mobile = student.Mobile;
        //         std.AlternateMobile = student.AlternateMobile;
        //         std.Email = student.Email;
        //         std.CourseId = student.CourseId;
        //         std.HouseNo = student.HouseNo;
        //         std.StreetName = student.StreetName;
        //         std.Pincode = student.Pincode;
        //         std.AreaName = student.AreaName;
        //         std.State = student.State;
        //     }
        //     dc.StudentModels.Update(std);
        //     await dc.SaveChangesAsync();
        //     return Ok(std);
        // }

        [HttpDelete("DeleteInstitutes")]
        public async Task<IActionResult> DeleteInstitutes([FromBody] List<int> instituteIds)
        {
            try
            {
                var institutes = await dc.InstituteModels.Where(i => instituteIds.Contains(i.InstituteId)).ToListAsync();
                if (institutes.Count == 0)
                {
                    return NotFound(); // Return 404 Not Found if no institutes with the given IDs are found
                }

                dc.InstituteModels.RemoveRange(institutes);
                await dc.SaveChangesAsync();

                return Ok(new { Status = "Success", Count = institutes.Count }); // Return success status and the count of deleted institutes
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during the delete operation
                // Log the exception or return a meaningful error message, based on your application's requirements
                return StatusCode(500, $"An error occurred while deleting the institutes: {ex.Message}");
            }
        }

        //get only institute Id & name

        //institute and rating
        [HttpGet("institute with rating")]
        public async Task<IActionResult> instituterating()
        {
            // var inst = await dc.InstituteModels.ToListAsync();
            // var rat = await dc.RatingsModel.ToListAsync();

            var instrat = await Task.Run(() =>
            {
                
              return  (from i in dc.InstituteModels
                        join r in dc.RatingModels on i.InstituteId equals r.InstituteId
                        group r by new { i.InstituteName, i.InstituteAddress ,i.ImageUrl,i.InstituteId} into g
                        select new
                        {
                            InstituteId = g.Key.InstituteId,
                            InstituteName = g.Key.InstituteName,
                            InstituteAddress = g.Key.InstituteAddress,
                            AverageRating = g.Average(r => r.Rating),
                            ImageUrl = g.Key.ImageUrl
                        }).ToList();
            });
            return Ok(instrat);

        }

        [HttpGet("viewStudentsA")]

        public async Task<IActionResult> viewStudentsA()
        {
            var students = await Task.Run(() =>
            {
             return (from st in dc.StudentModels
            from cs in dc.CourseModels
            where st.CourseId == cs.CourseId
            select new
            {
                StudentId = st.StudentId,
                FirstName = st.FirstName,
                LastName = st.LastName,
                CourseName = cs.CourseName,
                Mobile = st.Mobile

            }).ToList();

            });
             

            return Ok(students);


        }

        // [HttpGet("Getinstitutescourses")]
        // public async Task<IActionResult> Getinstitutescourse()
        // {
        //     var instcou = ( from i in dc.InstituteModels
        //                     from c in dc.CourseModels
        //                     where c.InstituteId == i.InstituteId
        //                     select new
        //                     {
        //                         IN = i.InstituteName,
        //                         CN = c.CourseName,
        //                         CID = c.CourseId
        //                     }

        //                     ).ToList();

        //     return Ok(instcou);
        // }
        [HttpGet("Getinstitutescourses")]
        public async Task<IActionResult> GetInstitutesCourses()
        {
            var instcou = await Task.Run(() =>
            {
                return (from i in dc.InstituteModels
                        from c in dc.CourseModels
                        where c.InstituteId == i.InstituteId
                        select new
                        {
                            InstituteName = i.InstituteName,
                            CourseName = c.CourseName,
                            CourseId = c.CourseId
                        }).ToList();
            });

            return Ok(instcou);
        }

        

        [HttpGet("Getinstrat")]
        public async Task<IActionResult> Getinstrat()
        {

            var instcou = await Task.Run(() =>
{
    var result = from i in dc.InstituteModels
                 join r in dc.RatingModels on i.InstituteId equals r.InstituteId into ratingGroup
                 from rg in ratingGroup.DefaultIfEmpty()
                 group rg by new { i.InstituteId, i.InstituteName, i.ImageUrl } into g
                 select new
                 {
                     g.Key.InstituteId,
                     g.Key.InstituteName,
                     g.Key.ImageUrl,
                     AverageRating = g.Average(r => r != null ? r.Rating : 0)
                 };

    return result.ToList();
});

            return Ok(instcou);

        }

        [HttpGet("GetRatingsForInstitute/{instituteId}")]
        public IActionResult GetRatingsForInstitute(int instituteId)
        {
            var ratings = (from r in dc.RatingModels
                           join u in dc.UserModels on r.UserId equals u.UserId
                           where r.InstituteId == instituteId
                           select new
                           {
                               UserId = u.UserId,
                               Username = u.Username,
                               Rating = r.Rating,
                               Comment = r.Comments
                           }).ToList();

            return Ok(ratings);
        }

        [HttpPost("AddProgressDetails")]
        public async Task<IActionResult> AddProgressDetails([FromBody] ProgressModel p)
        {
            
            var progress = new ProgressModel
            {
                Progresspercentage = p.Progresspercentage,
                
                Timetamp = p.Timetamp,
                CourseId = p.CourseId,
                UserId = p.UserId,
                Status = p.Status
            };

            
            dc.ProgressModels.Add(progress);

            await dc.SaveChangesAsync();
            

            // Return a success response
            return Ok(progress);
        }

        [HttpGet("GetRecentProgress")]
        public IActionResult GetRecentProgress(int userId, int courseId)
        {
            var recentProgress = dc.ProgressModels
                .Where(p => p.UserId == userId && p.CourseId == courseId)
                .OrderByDescending(p => p.Timetamp)
                .FirstOrDefault();

            if (recentProgress == null)
            {
                return NotFound(); // Return a 404 Not Found response if no recent progress is found
            }

            var progressDetails = new
            {
                ProgressId = recentProgress.ProgressId,
                ProgressPercentage = recentProgress.Progresspercentage,
                Timestamp = recentProgress.Timetamp,
                UserId = recentProgress.UserId,
                CourseId = recentProgress.CourseId,
                Status = recentProgress.Status
            };

            return Ok(progressDetails);
        }

        [HttpPost("RateInstitute")]

        public async Task<IActionResult> RateInstitute( RatingModel R)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await dc.RatingModels.AddAsync(R);
                await dc.SaveChangesAsync();
                return Ok("Rating added");
            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the institute.");
            }
        }




















    }
    

    
}