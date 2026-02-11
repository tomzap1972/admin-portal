using Microsoft.AspNetCore.Mvc;
using AdminPortal.API.Models;
using AdminPortal.API.Services;

namespace AdminPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<List<User>> GetAll() =>
        await _userService.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetById(string id)
    {
        var user = await _userService.GetByIdAsync(id);
        return user is null ? NotFound() : user;
    }

    [HttpPost]
    public async Task<ActionResult<User>> Create(User user)
    {
        var created = await _userService.CreateAsync(user);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, User user)
    {
        var existing = await _userService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        user.Id = id;
        await _userService.UpdateAsync(id, user);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _userService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _userService.DeleteAsync(id);
        return NoContent();
    }
}
