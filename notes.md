# Website tech stack

## Hosting

- MongoDB Atlas - free
- Netlify/Vercel - free
- DigitalOcean - $4/month

## CMS

Payload CMS will be used in order to enable anyone to keep the website alive in
the future.

## Database

Postgres - is supported by the CMS and AWS. Robust and structured.

## Frontend

AstroJS - works well with the CMS, is extensible and fast.

## Sitemap

<about-us>
    <jonang-choeling-history />
    <teachers />
    <curriculum />
    <our-administration>
        <cultural-society />
        <monastery />
        <kalachakra />
        <school />
        <fund />
    </our-administration>
    <dharma-centre>
        <delhi-house />
        <arunachal-society />
    </dharma-centre>
</about-us>
<jonang-doctrine>
    <jonang-history>
        <jonang-lineage>
            <buddha-dolpa>
            <yogi-taranath />
        <jonang-lineage />
    <jonang-history />
    <philosophy />
</jonang-doctrine>
<news />
<events>
    <weekly-activities />
    <annual-activities />
    <sutra-studies />
    <retreat />
</events>
<visitors-guide />
<support-us />
<contact />

# TODO

## CMS

## a11y

## SEO

## Newsletter

# Challanges & Solutions

## Live Preview in Payload

A live preview of the website can be activated in Payload. The Live Preview
loads in a iframe element into the Payload interface which sets a React
application as its source, and sends data from Payload through
window.postMessage events. With this activated, users of the CMS can see the
changes they're making immediately without having to rebuild the page.

As the website is build with AstroJS and not React, it will need to be converted
into React for the Live Preview to work. The solution is to convert the AstroJS
website into a React application with Vite and run it in dev mode on the server
alongside Payload.

## Newsletter

The sending out of newsletters will be handled without any additional libraries.
A 'Newsletters' Payload Collection will be created, with a richText field as the
main content field. After creating a Newsletter document, the user can click a
button which will trigger a hook which uses the nodemailer library bundled with
Payload to send out the HTML contents of the document to a list of names and
user emails which are stoerd on the MongoDB. On the frontend, the 'Subscribe to
newsletter' section will send a form to the backend and store the name and
emails of users who sign up.

## Image optimization

All image uploads will trigger a hook which converts the image to webp with 80%
quality and remove the non-webp file in order to save space on the server.

## Automatic building of website after content update

When the CMS updates content, a hook will trigger an automatic rebuild of the
website.

## Automatic update of Payload after push to Github

Utilize Github webhooks to automatically pull, build and deploy Payload on the
server whenever a push is made to the Github.
