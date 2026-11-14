import urllib.request
import json
import time
import os
import zipfile

def generate_apk(pwa_url, package_name="com.titanbulk.journal", app_name="TitanBulk"):
    host_url = pwa_url.rstrip('/')
    payload = {
        "additionalTrustedOrigins": [],
        "appVersion": "1.0.0",
        "appVersionCode": 1,
        "backgroundColor": "#0a0e17",
        "display": "standalone",
        "enableSiteSettingsShortcut": True,
        "enableNotifications": False,
        "includeSourceCode": False,
        "fallbackType": "customtabs",
        "features": {
            "locationDelegation": {"enabled": False},
            "playBilling": {"enabled": False}
        },
        "host": host_url,
        "iconUrl": f"{host_url}/icon-512.png",
        "launcherName": app_name,
        "name": f"{app_name} Workout Journal",
        "orientation": "portrait-primary",
        "packageId": package_name,
        "pwaUrl": f"{host_url}/",
        "signingMode": "new",
        "signing": {
            "alias": "titan-key",
            "fullName": "Titan Athlete",
            "organization": "Titan",
            "organizationalUnit": "Fitness",
            "countryCode": "US",
            "keyPassword": "titanPassword123!",
            "storePassword": "titanPassword123!"
        }
    }

    req = urllib.request.Request(
        "https://pwabuilder-cloudapk.azurewebsites.net/enqueuePackageJob",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "platform-identifier": "ServerUI",
            "platform-identifier-version": "1.0.0"
        }
    )

    print(f"Submitting APK build request for {host_url}...")
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            job_data = json.loads(res.read().decode())
            job_id = job_data.get("id")
            token = job_data.get("accessToken")
            print(f"Job enqueued successfully! ID: {job_id}")

            for step in range(25):
                time.sleep(3)
                p_req = urllib.request.Request(
                    f"https://pwabuilder-cloudapk.azurewebsites.net/getPackageJob?id={job_id}",
                    headers={"Authorization": f"Bearer {token}"}
                )
                with urllib.request.urlopen(p_req, timeout=15) as p_res:
                    status_obj = json.loads(p_res.read().decode())
                    cur_status = status_obj.get("status")
                    print(f"[{step+1}/25] APK Build Status: {cur_status}")

                    if cur_status == "Completed":
                        print("Build finished! Downloading package...")
                        d_req = urllib.request.Request(
                            f"https://pwabuilder-cloudapk.azurewebsites.net/downloadPackageZip?id={job_id}",
                            headers={"Authorization": f"Bearer {token}"}
                        )
                        zip_target = "Titan_Android_Package.zip"
                        with urllib.request.urlopen(d_req, timeout=30) as d_res:
                            with open(zip_target, "wb") as out_f:
                                out_f.write(d_res.read())
                        print(f"Downloaded {zip_target} ({os.path.getsize(zip_target)} bytes)!")

                        # Extract APK from zip
                        with zipfile.ZipFile(zip_target, 'r') as z:
                            for filename in z.namelist():
                                print("  Inside zip:", filename)
                                if filename.endswith('.apk'):
                                    z.extract(filename, ".")
                                    print(f"--> EXTRACTED APK: {filename}")
                        return True
                    elif cur_status == "Failed":
                        print("Build Failed. Logs:", status_obj.get("logs"))
                        return False
    except Exception as e:
        print("Build error:", e)
        return False

if __name__ == "__main__":
    # Test with dummy or test URL
    generate_apk("https://pwa-builder.github.io/nimbus")
