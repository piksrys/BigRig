/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.4.0): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
(function ($) {
  if (typeof $ === 'undefined') {
    throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
  }

  var version = $.fn.jquery.split(' ')[0].split('.');
  var minMajor = 1;
  var ltMajor = 2;
  var minMinor = 9;
  var minPatch = 1;
  var maxMajor = 4;

  if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
  }
})($);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyIkIiwiVHlwZUVycm9yIiwidmVyc2lvbiIsImZuIiwianF1ZXJ5Iiwic3BsaXQiLCJtaW5NYWpvciIsImx0TWFqb3IiLCJtaW5NaW5vciIsIm1pblBhdGNoIiwibWF4TWFqb3IiLCJFcnJvciJdLCJtYXBwaW5ncyI6IkFBYUE7Ozs7OztBQU9BLENBQUMsVUFBQ0EsQ0FBRCxFQUFPO0FBQ04sTUFBSSxPQUFPQSxDQUFQLEtBQWEsV0FBakIsRUFBOEI7QUFDNUIsVUFBTSxJQUFJQyxTQUFKLENBQWMsa0dBQWQsQ0FBTjtBQUNEOztBQUVELE1BQU1DLFVBQVVGLEVBQUVHLEVBQUYsQ0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLENBQXZCLEVBQTBCQSxLQUExQixDQUFnQyxHQUFoQyxDQUFoQjtBQUNBLE1BQU1DLFdBQVcsQ0FBakI7QUFDQSxNQUFNQyxVQUFVLENBQWhCO0FBQ0EsTUFBTUMsV0FBVyxDQUFqQjtBQUNBLE1BQU1DLFdBQVcsQ0FBakI7QUFDQSxNQUFNQyxXQUFXLENBQWpCOztBQUVBLE1BQUlSLFFBQVEsQ0FBUixJQUFhSyxPQUFiLElBQXdCTCxRQUFRLENBQVIsSUFBYU0sUUFBckMsSUFBaUROLFFBQVEsQ0FBUixNQUFlSSxRQUFmLElBQTJCSixRQUFRLENBQVIsTUFBZU0sUUFBMUMsSUFBc0ROLFFBQVEsQ0FBUixJQUFhTyxRQUFwSCxJQUFnSVAsUUFBUSxDQUFSLEtBQWNRLFFBQWxKLEVBQTRKO0FBQzFKLFVBQU0sSUFBSUMsS0FBSixDQUFVLDhFQUFWLENBQU47QUFDRDtBQUNGLENBZkQsRUFlR1gsQ0FmSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBBbGVydCBmcm9tICcuL2FsZXJ0J1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL2J1dHRvbidcbmltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2Nhcm91c2VsJ1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4vY29sbGFwc2UnXG5pbXBvcnQgRHJvcGRvd24gZnJvbSAnLi9kcm9wZG93bidcbmltcG9ydCBNb2RhbCBmcm9tICcuL21vZGFsJ1xuaW1wb3J0IFBvcG92ZXIgZnJvbSAnLi9wb3BvdmVyJ1xuaW1wb3J0IFNjcm9sbHNweSBmcm9tICcuL3Njcm9sbHNweSdcbmltcG9ydCBUYWIgZnJvbSAnLi90YWInXG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuL3Rvb2x0aXAnXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4yKTogaW5kZXguanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbigoJCkgPT4ge1xuICBpZiAodHlwZW9mICQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGpRdWVyeS4galF1ZXJ5IG11c3QgYmUgaW5jbHVkZWQgYmVmb3JlIEJvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdC4nKVxuICB9XG5cbiAgY29uc3QgdmVyc2lvbiA9ICQuZm4uanF1ZXJ5LnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKVxuICBjb25zdCBtaW5NYWpvciA9IDFcbiAgY29uc3QgbHRNYWpvciA9IDJcbiAgY29uc3QgbWluTWlub3IgPSA5XG4gIGNvbnN0IG1pblBhdGNoID0gMVxuICBjb25zdCBtYXhNYWpvciA9IDRcblxuICBpZiAodmVyc2lvblswXSA8IGx0TWFqb3IgJiYgdmVyc2lvblsxXSA8IG1pbk1pbm9yIHx8IHZlcnNpb25bMF0gPT09IG1pbk1ham9yICYmIHZlcnNpb25bMV0gPT09IG1pbk1pbm9yICYmIHZlcnNpb25bMl0gPCBtaW5QYXRjaCB8fCB2ZXJzaW9uWzBdID49IG1heE1ham9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXBcXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgYXQgbGVhc3QgalF1ZXJ5IHYxLjkuMSBidXQgbGVzcyB0aGFuIHY0LjAuMCcpXG4gIH1cbn0pKCQpXG5cbmV4cG9ydCB7XG4gIFV0aWwsXG4gIEFsZXJ0LFxuICBCdXR0b24sXG4gIENhcm91c2VsLFxuICBDb2xsYXBzZSxcbiAgRHJvcGRvd24sXG4gIE1vZGFsLFxuICBQb3BvdmVyLFxuICBTY3JvbGxzcHksXG4gIFRhYixcbiAgVG9vbHRpcFxufVxuIl0sImZpbGUiOiJpbmRleC5qcyJ9
