# 📷 `Chasing_studio` Photo Blog

Website
-
https://chasing-studio.vercel.app/

Features
-
- Photo upload with EXIF extraction
- Blog create with rich editor
- Organize photos by tag and camera model
- Infinite scroll
- Built-in auth
- Light/dark mode
- i18n with 3 languages
- Automatic OG image generation
- Support for Fujifilm simulations

<img src="/readme/og-image-share.png" alt="OG Image Preview" width=600 />

Installation
-
### 1. Develop locally

1. Clone code
2. Run `pnpm i` to install dependencies
3. Set environment variable `AUTH_URL` locally (not in production) to `http://localhost:3000/api/url` (_this is a temporary limitation of `next-auth` v5.0_)
4. Run `vc dev` to start dev server, and utilize Vercel-stored environment variables

### 2. Storage

1. Add required storage ([Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database) + [Vercel Blob](https://vercel.com/docs/storage/vercel-blob/quickstart#create-a-blob-store))
2. Add environment variables
- `NEXT_PUBLIC_SITE_TITLE` (e.g., My Photos)
- `NEXT_PUBLIC_SITE_DOMAIN` (e.g., photos.domain.com)
- `NEXT_PUBLIC_SITE_DESCRIPTION` (optional—mainly used for OG meta)
3. Go to `/admin` and upload your first photo and blog

### 3. Setup Auth

1. [Generate auth secret](https://generate-secret.vercel.app/32)
2. Add to environment variables:
- `AUTH_SECRET`
3. Add admin user to environment variables:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### 4. Add Analytics (optional)

1. Open project on Vercel(if deployed)
2. Click "Analytics" tab
3. Follow "Enable Web Analytics" instructions (`@vercel/analytics` is already part of your project)

### 6. Optional configuration

- `NEXT_PUBLIC_PRO_MODE = 1` enables higher quality image storage (will result in increased storage usage)
- `NEXT_PUBLIC_BLUR_DISABLED = 1` prevents image blur data being stored and displayed (potentially useful for limiting Postgres usage)
- `NEXT_PUBLIC_GEO_PRIVACY = 1` disables collection/display of location-based data
- `NEXT_PUBLIC_IGNORE_PRIORITY_ORDER = 1` prevents `priority_order` field affecting photo order
- `NEXT_PUBLIC_PUBLIC_API = 1` enables public API available at `/api`
- `NEXT_PUBLIC_HIDE_REPO_LINK = 1` removes footer link to repo
- `NEXT_PUBLIC_HIDE_FILM_SIMULATIONS = 1` prevents Fujifilm simulations showing up in `/grid` sidebar
- `NEXT_PUBLIC_HIDE_EXIF_DATA = 1` hides EXIF data in photo details and OG images (potentially useful for portfolios, which don't focus on photography)
- `NEXT_PUBLIC_GRID_ASPECT_RATIO = 1.5` sets aspect ratio for grid tiles (defaults to `1`—setting to `0` removes the constraint)
- `NEXT_PUBLIC_OG_TEXT_ALIGNMENT = BOTTOM` keeps OG image text bottom aligned (default is top)

## Alternate storage providers

Only one storage adapter—Vercel Blob, Cloudflare R2, or AWS S3—can be used at a time. Ideally, this is configured before photos are uploaded (see [Issue #34](https://github.com/sambecker/exif-photo-blog/issues/34) for migration considerations). If you have multiple adapters, you can set one as preferred by storing "aws-s3," "cloudflare-r2," or "vercel-blob" in `NEXT_PUBLIC_STORAGE_PREFERENCE`.

### Cloudflare R2

1. Setup bucket
   - [Create R2 bucket](https://developers.cloudflare.com/r2/) with default settings
   - Setup CORS under bucket settings:
   ```json
   [{
       "AllowedHeaders": ["*"],
       "AllowedMethods": [
         "GET",
         "PUT"
       ],
       "AllowedOrigins": [
          "http://localhost:3000",
          "https://{VERCEL_PROJECT_NAME}*.vercel.app",
          "{PRODUCTION_DOMAIN}"
       ]
   }]
   ```
   - Enable public hosting by doing one of the following:
       - Select "Connect Custom Domain" and choose a Cloudflare domain
       - OR
       - Select "Allow Access" from R2.dev subdomain
   - Store public configuration:
     - `NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET`: bucket name
     - `NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID`: account id (found on R2 overview page)
     - `NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN`: either "your-custom-domain.com" or "pub-jf90908...s0d9f8s0s9df.r2.dev" (_do not include "https://" in your domain_)
2. Setup private credentials
   - Create API token by selecting "Manage R2 API Tokens," and clicking "Create API Token"
   - Select "Object Read & Write," choose "Apply to specific buckets only," and select the bucket created in Step 1
   - Store credentials (⚠️ _Ensure access keys are not prefixed with `NEXT_PUBLIC`_):
     - `CLOUDFLARE_R2_ACCESS_KEY`
     - `CLOUDFLARE_R2_SECRET_ACCESS_KEY`

### AWS S3

1. Setup bucket
   - [Create S3 bucket](https://s3.console.aws.amazon.com/s3) with "ACLs enabled," and "Block all public access" turned off
   - Setup CORS under bucket permissions:
     ```json
     [{
      "AllowedHeaders": ["*"],
      "AllowedMethods": [
        "GET",
        "PUT"
      ],
      "AllowedOrigins": [
        "http://localhost:*",
        "https://{VERCEL_PROJECT_NAME}*.vercel.app",
        "{PRODUCTION_DOMAIN}"
      ],
      "ExposeHeaders": []
     }]
     ```
   - Store public configuration
     - `NEXT_PUBLIC_AWS_S3_BUCKET`: bucket name
     - `NEXT_PUBLIC_AWS_S3_REGION`: bucket region, e.g., "us-east-1"
2. Setup private credentials
   - [Create IAM policy](https://console.aws.amazon.com/iam/home#/policies) using JSON editor:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "s3:PutObject",
             "s3:PutObjectACL",
             "s3:GetObject",
             "s3:ListBucket",
             "s3:DeleteObject"
           ],
           "Resource": [
             "arn:aws:s3:::{BUCKET_NAME}",
             "arn:aws:s3:::{BUCKET_NAME}/*"
           ]
         }
       ]
     }
     ```
   - [Create IAM user](https://console.aws.amazon.com/iam/home#/users) by choosing "Attach policies directly," and selecting the policy created above. Create "Access key" under "Security credentials," choose "Application running outside AWS," and store credentials (⚠️ _Ensure access keys are not prefixed with `NEXT_PUBLIC`_):
     - `AWS_S3_ACCESS_KEY`
     - `AWS_S3_SECRET_ACCESS_KEY`

FAQ
-
#### Why are my thumbnails square?
> Absent configuration, the default grid aspect ratio is `1`. It can be set to any number (for instance `1.5` for 3:2 images) via `NEXT_PUBLIC_GRID_ASPECT_RATIO` or ignored entirely by setting to `0`.

#### My images/content have fallen out of sync with my database and/or my production site no longer matches local development. What do I do?
> Navigate to `/admin/configuration` and click "Clear Cache."

#### I'm seeing server-side runtime errors when loading a page after updating my fork. What do I do?
> Navigate to `/admin/configuration` and click "Clear Cache." If this doesn't help, [open an issue](https://github.com/sambecker/exif-photo-blog/issues/new).

#### Why aren't my Fujifilm simulations importing alongside EXIF data?
> Fujifilm simulation data is stored in vendor-specific Makernote binaries embedded in EXIF data. Under certain circumstances an intermediary may strip out this data for a variety of reasons. For instance, there is a known issue on iOS where editing an image, e.g., cropping it, causes Makernote data loss. If your simulation data appears to be missing, try importing the original file as it was stored by the camera. Additionally, if you can confirm the simulation mode on camera, you can then edit the photo record and manually select it.

#### Why do my images appear flipped/rotated incorrectly?
> For a number of reasons, only EXIF orientations: 1, 3, 6, and 8 are supported. Orientations 2, 4, 5, and 7—which make use of mirroring—are not supported.
