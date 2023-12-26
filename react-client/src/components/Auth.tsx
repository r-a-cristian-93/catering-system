
function isUserAuthenticated(): boolean
{
	const jwt: string | null = getCookie('JWT');

	if (jwt !== null)
		return true;
	else
		return false;
}

function getCookie(cookieName: string): string | null
{
	const name = `${cookieName}=`;
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split(';');

	for (let i = 0; i < cookieArray.length; i++) 
	{
		const cookie: string = cookieArray[i].trim();
		if (cookie.indexOf(name) === 0) 
		{
			return cookie.substring(name.length, cookie.length);
		}
	}

	return null;
}

export default isUserAuthenticated;