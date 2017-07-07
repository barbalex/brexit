// @flow
module.exports = (): string => {
  const isDev = process.env.NODE_ENV !== 'production'
  const jsPath = isDev ? '/app' : '/bb.1.0.0'
  const cssPath = isDev ? '' : '/bb.1.0.0.css'
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
  <link rel="stylesheet" href="${cssPath}"/>
  <link rel="shortcut icon" href="/favicons/favicon.ico">
  <link rel="icon" sizes="16x16 32x32 64x64" href="/favicons/favicon.ico">
  <link rel="icon" type="image/png" sizes="196x196" href="/favicons/favicon-192.png">
  <link rel="icon" type="image/png" sizes="160x160" href="/favicons/favicon-160.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96.png">
  <link rel="icon" type="image/png" sizes="64x64" href="/favicons/favicon-64.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16.png">
  <link rel="apple-touch-icon" href="/favicons/favicon-57.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/favicons/favicon-114.png">
  <link rel="apple-touch-icon" sizes="72x72" href="/favicons/favicon-72.png">
  <link rel="apple-touch-icon" sizes="144x144" href="/favicons/favicon-144.png">
  <link rel="apple-touch-icon" sizes="60x60" href="/favicons/favicon-60.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/favicons/favicon-120.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/favicons/favicon-76.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/favicons/favicon-152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-180.png">
  <meta name="msapplication-TileColor" content="#FFFFFF">
  <meta name="msapplication-TileImage" content="/favicons/favicon-144.png">
  <meta name="msapplication-config" content="/favicons/browserconfig.xml">
</head>
<body>
  <div id='content'></div>
</body>
<script type="text/javascript" src="/tinymce/tinymce.min.js"></script>
<script src="${jsPath}"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics','ga')

  ga('create', 'UA-72242597-1', 'auto')
  ga('send', 'pageview')

</script>
</html>
`
}
