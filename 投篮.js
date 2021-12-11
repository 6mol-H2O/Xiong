toulan = function(begin_x = 30 , begin_y = 30 , end_x = 100 , end_y = 100 , target_x = 80 , target_y = 85,  begin_speed = 20 , angle = 79)
{
    let now_x = begin_x , now_y = begin_y , speed_x = begin_speed * Math.cos(angle * Math.PI / 180) , speed_y = begin_speed * Math.sin(angle * Math.PI / 180)
    let points = [[now_x , now_y]] , time_step = 0.2 , g = -1 , get_score = false
    while(now_y >= 0)
    {
        now_x += speed_x * time_step
        now_y += speed_y * time_step + 0.5 * g * time_step ** 2
        if (now_x >= end_x)
        {
            now_x = 2 * end_x - now_x
            speed_x *= -1
        }
        if(now_x < 0)
            {
                now_x -= now_x
                speed_x *= -1
            }
        if(now_y >= 100)
        {
            now_y = 100 - now_y % 100
            speed_y *= -1
        }
        speed_y += g*time_step
        points.push([now_x , now_y])
        if(target_x - 5 <= now_x &&  now_x <= target_x + 5 && now_y <= target_y + 5 && now_y >= target_y - 5 )
        {
            get_score = true
            break;
        }
    }
    points[points.length-1][1] = Math.max(points[points.length-1][1] , 0)
    return points
}
let b = toulan()
console.log(b)