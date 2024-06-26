﻿using System.ComponentModel.DataAnnotations;
using Elyspio.Utils.Telemetry.Examples.WebApi.Abstractions.Interfaces.Models;
using Elyspio.Utils.Telemetry.Examples.WebApi.Models.Base;

namespace Elyspio.Utils.Telemetry.Examples.WebApi.Models.Transports;

public class User : UserBase, ITransport
{
	[Required] public required Guid Id { get; init; }
}